
/**
 * Route Mappings
 * (sails.config.routes)
 */


import customConfigLoader from './util/customConfigLoader.js';

var customConfig = customConfigLoader('routes.js');

var defaultConfig = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  //----- index -----


  //----- api -----
  'get /api/admin/mock': "api/admin/MockController.find",

  'post /api/admin/upload': 'api/admin/ImageController.upload',
  'delete /api/admin/upload/:id': 'api/admin/ImageController.destroy',


  'get /api/admin/user': 'api/admin/UserController.find',
  'get /api/admin/user/:id': 'api/admin/UserController.findOne',
  'post /api/admin/user': 'api/admin/UserController.create',
  'put /api/admin/user/:id': 'api/admin/UserController.update',
  'delete /api/admin/user/:id': 'api/admin/UserController.destroy',

  'get /api/admin/post': 'api/admin/PostController.find',
  'get /api/admin/post/:id': 'api/admin/PostController.findOne',
  'post /api/admin/post': 'api/admin/PostController.create',
  'put /api/admin/post/:id': 'api/admin/PostController.update',
  'delete /api/admin/post/:id': 'api/admin/PostController.destroy',

  'post /api/allpay/paid': 'api/AllpayController.paid',
  'post /api/allpay/paymentinfo': 'api/AllpayController.paymentinfo',

  'get /api/admin/slogan': 'api/admin/SloganController.find',
  'get /api/admin/slogan/:id': 'api/admin/SloganController.findOne',
  'post /api/admin/slogan': 'api/admin/SloganController.create',
  'put /api/admin/slogan/:id': 'api/admin/SloganController.update',
  'delete /api/admin/slogan/:id': 'api/admin/SloganController.destroy',

  'get /api/admin/allpay':        'api/AllpayController.find',
  'get /api/admin/allpay/:id':    'api/AllpayController.findOne',
  'post /api/admin/allpay':       'api/AllpayController.create',
  'put /api/admin/allpay/:id':    'api/AllpayController.update',
  'delete /api/admin/allpay/:id': 'api/AllpayController.destroy',

  'get /api/admin/message':        'api/admin/MessageController.find',
  'get /api/admin/message/:id':    'api/admin/MessageController.findOne',
  'post /api/admin/message':       'api/admin/MessageController.create',
  'put /api/admin/message/:id':    'api/admin/MessageController.update',
  'delete /api/admin/message/:id': 'api/admin/MessageController.destroy',

  'post /api/user/follow/:id':    'api/UserController.follow',
  'post /api/user/unfollow/:id':  'api/UserController.unfollow',
  'post /api/user/edit/:id':      'api/UserController.update',

  //----- Admin -----
  '/admin':           'AdminController.index',
  '/admin/config.js': 'AdminController.config',

  //----- AuthController -----
  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback',

  //----- MainController -----
  'get /': 'MainController.index',

  //----- ReportController -----
  'get /report': 'ReportController.index',
  'get /report/knowtype': 'ReportController.knowtype',
  'get /report/general': 'ReportController.general',

  //----- WallController -----
  'get /wall/:id': 'WallController.show',
};

module.exports.routes = {
  // '/': {
  //   view: 'index'
  // },
  ...customConfig,
  ...defaultConfig,
  "/admin/:controller/:action/:id?": {},
  "/:controller/:action/:id?": {}
};
