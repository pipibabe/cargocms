/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
  appUrl: 'http://cargo-dev.trunksys.com/',
  port: 5001,
  socials: ["facebook", "googleplus", "twitter"],
  // models: {
  //   connection: 'sqlite',
  //   migrate: 'drop'
  // },
  models: {
    connection: 'mysql',
    migrate: 'safe'
  },
  log: {
    level: 'verbose'
  },
  passport: {
    local: {
      strategy: require('passport-local').Strategy
    },
    facebook: {
      name: 'Facebook',
      protocol: 'oauth2',
      strategy: require('passport-facebook').Strategy,
      options: {
        clientID: '144219216008720',
        clientSecret: '',
        callbackURL: "",
        profileFields: [
          'id', 'email', 'gender', 'link', 'locale',
          'name', 'timezone', 'updated_time', 'verified',
          'displayName', 'photos'
        ]
      }
    }
  }
};
