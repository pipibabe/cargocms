/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */

import express from 'express';
import moment from 'moment';
import fs from 'fs';
import linkifyStr from 'linkifyjs/string';

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  // middleware: {

  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    // order: [
    //   'startRequestTimer',
    //   'cookieParser',
    //   'session',
    //   'myRequestLogger',
    //   'bodyParser',
    //   'handleBodyParserError',
    //   'compress',
    //   'methodOverride',
    //   'poweredBy',
    //   '$custom',
    //   'router',
    //   'www',
    //   'favicon',
    //   '404',
    //   '500'
    // ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // }


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')

  // },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  cache: 86400000,

  customMiddleware: function(app) {
    // app.use(express.logger());
    // app.use(express.compress());
    var {environment} = sails.config;
    var maxAge = sails.config.http.cache;
    if(environment == 'production'){
      maxAge = sails.config.http.cache
    }

    const files = fs.readdirSync('.');
    for (var dirName of files) {
      let isDir = fs.statSync(dirName).isDirectory();
      if (isDir && dirName.startsWith('assets-')) {
        sails.log.debug('Setup static assets folder: ' + dirName + ', uri: /' + dirName.replace('-', '/'));
        app.use('/' + dirName.replace('-', '/'), express.static(dirName, {maxAge}));
      }

      if (isDir && dirName === 'assets') {
        app.use('/assets/', express.static(dirName, {maxAge}));
      }
    }
    console.log("=== ship ===");
    app.use('/ship', express.static('react-app-ship/dist', {maxAge}));



  },
  middleware: {
    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      //'myRequestLogger',
      'myPageInjection',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],
    myPageInjection: function (req, res, next) {

      res._stylesheets = [];
      res._stylesheetBlock = '';
      res._scripts = [];
      res._scriptBlock = '';
      res._metas = [];

      res.locals.addScripts = function() {
        for (var i = 0; i < arguments.length; i++) {
          res._scripts.push(arguments[i]);
        }
      };
      res.locals.getScripts = function() {
        return res._scripts;
      };
      res.locals.addScriptBlock = function(block) {
        res._scriptBlock += block;
      };
      res.locals.getScriptBlock = function() {
        return res._scriptBlock;
      };

      res.locals.addStylesheets = function() {
        for (var i = 0; i < arguments.length; i++) {
          res._stylesheets.push(arguments[i]);
        }
      };
      res.locals.getStylesheets = function() {
        return res._stylesheets;
      };
      res.locals.addStylesheetBlock = function(block) {
        res._stylesheetBlock += block;
      };
      res.locals.getStylesheetBlock = function() {
        return res._stylesheetBlock;
      };
      res.locals.addMeta = function(meta) {
        for (var i = 0; i < arguments.length; i++) {
          res._metas.push(arguments[i]);
        }
      },
      res.locals.getMetas = function() {
        return res._metas;
      },

      res.locals.LayoutUtils = {
        addScripts: function() {
          for (var i = 0; i < arguments.length; i++) {
            res._scripts.push(arguments[i]);
          }
        },
        getScripts: function() {
          return res._scripts;
        },
        addScriptBlock: function(block) {
          res._scriptBlock += block;
        },
        getScriptBlock: function() {
          return res._scriptBlock;
        },
        addStylesheets: function() {
          for (var i = 0; i < arguments.length; i++) {
            res._stylesheets.push(arguments[i]);
          }
        },
        getStylesheets: function() {
          return res._stylesheets;
        },
        addStylesheetBlock: function(block) {
          res._stylesheetBlock += block;
        },
        getStylesheetBlock: function() {
          return res._stylesheetBlock;
        },
        addMeta: function(meta) {
          for (var i = 0; i < arguments.length; i++) {
            res._metas.push(arguments[i]);
          }
        },
        getMetas: function() {
          return res._metas;
        },
      };

      return next();
    },
  },
  locals: {
    filters: {
      formatDate: function(date) {
        if  (!date) {
          return null;
        }
        if (!(date instanceof Date)) {
          return date;
        }

        try {
          return moment(date).format('YYYY/MM/DD');
        }
        catch (e) {
          return date;
        }
      },
      formatDateTime: function(dateTime) {
        if (!dateTime) {
          return null;
        }
        if (!(dateTime instanceof Date)) {
          return dateTime;
        }

        try {
          return moment(dateTime).format('YYYY/MM/DD hh:mm:ss');
        }
        catch (e) {
          return dateTime;
        }
      },
      nl2br: function(text) {
        if (!text) {
          return text;
        }
        return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
      },
      linkifyjs: function(text) {
        if (!text) {
          return text;
        }
        return linkifyStr(text);
      },
    }
  }
};
