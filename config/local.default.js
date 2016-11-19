module.exports = {
  siteId: 'labfnp',
  appUrl: 'https://fdeb4c17.ngrok.io',
  // port: 5001,
  urls: {
    afterSignIn: '/lab'
  },
  offAuth: false,
  passport: {
    local: {
      strategy: require('passport-local').Strategy
    },
    facebook: {
      name: 'Facebook',
      protocol: 'oauth2',
      strategy: require('passport-facebook').Strategy,
      options: {
        clientID: '',
        clientSecret: '',
        callbackURL: "http://localhost:5001/auth/facebook/callback",
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
  },
  connections: {

    sqlite: {
      database: 'sequelize',
      dialect: 'sqlite',
      options: {
        'dialect': 'sqlite',
        // 'storage': './sqlite.db',
        storage: ':memory:',
        pool: false,
      }
    }
  },
  allpay: {
    domain: 'http://localhost:5001',
    merchantID: '2000132',
    hashKey: '5294y06JbISpM5x9',
    hashIV: 'v77hoKGq4kWxNNIS',
    debug: true,
    ReturnURL:'/api/allpay/paid',
    ClientBackURL:'/shop/done',
    PaymentInfoURL:'/api/allpay/paymentinfo',
    paymentMethod:[
      {
        code: 'ATM',
        name: 'ATM'
      },{
        code: 'Credit',
        name: '信用卡'
      }
    ]
  }
}
