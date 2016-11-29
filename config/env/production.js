/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
  port: 5011,
  socials: ["facebook", "googleplus", "twitter"],
  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  models: {
   connection: 'sqlite',
   migrate: 'drop'
  },
  // models: {
  //   connection: 'mysql',
  //   migrate: 'safe'
  // },
  verificationEmail: true,


  log: {
    level: "info"
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
        scope: [ 'email', 'public_profile' ],
        profileFields: [
          'id', 'email', 'gender', 'link', 'locale',
          'name', 'timezone', 'updated_time', 'verified',
          'displayName', 'photos'
        ]
      }
    }
  },
  session: {
    secret: '',
    adapter: 'redis',
    host: 'localhost',
    port: 6379,
    db: 0,
    pass: "",
    prefix: 'sess:',
    cookie: {
      maxAge: 2 * 60 * 60 * 1000
    }
  },
  reCAPTCHA: {
    key: '',
    secret: ''
  },
  storage: {
    // locate can be s3 or local
    locate: 's3',
    s3: {
      key: 'Access Key Id',
      secret: 'Secret Access Key',
      // region only can be us-standard
      // other region will get InvalidRequest Error
      region: 'region of bucket',
      bucket: 'bucket name'
    }
  },
  google: {
    name: 'GoogleAPIKey',
    key: undefined
  }

};
