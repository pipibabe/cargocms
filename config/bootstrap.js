/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

import fs from 'fs';

import MailerService from 'sails-service-mailer';
module.exports.bootstrap = async (cb) => {
  if(!sails.config.shareUrl) sails.config.shareUrl = "localhost:"+ sails.config.port
  // 這個已經用 config/urls.js 定義預設值
  //if(!sails.config.urls) sails.config.urls = {afterSignIn: "/"};
  _.extend(sails.hooks.http.app.locals, sails.config.http.locals);
  const {environment} = sails.config;


  try {

    sails.services.passport.loadStrategies();

    let {connection} = sails.config.models;

    if (!sails.config.hasOwnProperty('offAuth'))
      sails.config.offAuth = false;

    if(environment == 'production')
      sails.config.offAuth = false;

    let adminRole = await Role.findOrCreate({
      where: {authority: 'admin'},
      defaults: {authority: 'admin'}
    });

    let userRole = await Role.findOrCreate({
      where: {authority: 'user'},
      defaults: {authority: 'user'}
    });

    User.findOrCreate({
      where: {
        username: 'admin'
      },
      defaults: {
        username: 'admin',
        email: 'admin@example.com',
        firstName: '管',
        lastName: '李仁'
      }
    }).then(function(adminUsers) {
      Passport.findOrCreate({
        where: {
          provider: 'local',
          UserId: adminUsers[0].id
        },
        defaults: {
          provider: 'local',
          password: 'admin',
          UserId: adminUsers[0].id
        }
      });
      adminUsers[0].addRole(adminRole[0]);
    });


    /*
     * 是否要匯入的判斷必須交給 init 定義的程式負責
     */

    if (environment !== 'test') {
      // 自動掃描 init 底下的 module 資料夾後執行資料初始化
      fs.readdir('./config/init/', function(err, files) {
        for (var i in files) {
          let dirName = files[i];
          let isDir = fs.statSync('./config/init/' + dirName).isDirectory();
          if (isDir) {
            let hasIndexFile = fs.statSync('./config/init/' + dirName + '/index.js').isFile();
            require('./init/' + dirName).init();
          }
        }
      });
    }

    cb();
  } catch (e) {
    console.error(e.stack);
    cb(e);
  }
};
