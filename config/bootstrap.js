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
import shortid from 'shortid';
import MailerService from 'sails-service-mailer';
module.exports.bootstrap = async (cb) => {


  try {
    if(!sails.config.appUrl) sails.config.appUrl = "localhost:"+ sails.config.port
    if(sails.config.appUrl.endsWith('/'))
    sails.config.appUrl = sails.config.appUrl.substr(0, sails.config.appUrl.length - 1)
    // 這個已經用 config/urls.js 定義預設值
    //if(!sails.config.urls) sails.config.urls = {afterSignIn: "/"};
    _.extend(sails.hooks.http.app.locals, sails.config.http.locals);
    const {environment} = sails.config;

    sails.services.passport.loadStrategies();

    let {connection} = sails.config.models;

    if (!sails.config.hasOwnProperty('offAuth'))
      sails.config.offAuth = false;

    if(environment == 'production'){
      sails.config.offAuth = false;
      let recipes = await Recipe.findAll({where: {hashId:{$eq: null}}})
      let updateRecipes = recipes.map((recipe) => {
        recipe.hashId = shortid.generate();
        return recipe.save();
      })

      await Promise.all(updateRecipes);

    }

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
        firstName: '李仁',
        lastName: '管'
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
      fs.readdir('./config/init/', async function(err, files) {
        for (var i of files) {
          let dirName = i;
          let isDir = fs.statSync('./config/init/' + dirName).isDirectory();
          if (isDir) {
            let hasIndexFile = fs.statSync('./config/init/' + dirName + '/index.js').isFile();

            try {
              await require('./init/' + dirName).init();
            }
            catch (e) {
              sails.log.error(e);
            }
          }
        }
      });
    } else {
      // 測試時需要初始化的 module
      try {
        await require(`${__dirname}/init/allpay`).init();
      }
      catch (e) {
        sails.log.error(e);
      }
    }

    /* 檢查Google API Key是否存在 */
    if (sails.config.google===undefined || sails.config.google.key===undefined) {
      throw('google api Key not exist!!');
    }
    //檢查 FB Page & App ID 是否存在
    if (sails.config.facebook === undefined || sails.config.facebook.pageId === '' || sails.config.facebook.appId === ''){
      sails.log.error('Facebook Page ID or App ID not exist!!');
    }

    cb();
  } catch (e) {
    sails.log.error(e.stack);
    cb(e);
  }
};
