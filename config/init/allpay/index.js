module.exports.init = async () => {
  try {

    let allpayConfig = sails.config.allpay;
    if (!allpayConfig) {
      allpayConfig = {
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
    let AllpayClass = require('../../../api/services/libraries/Allpay');
    global.AllpayService = new AllpayClass.default({
      domain: allpayConfig.domain,
      merchantID: allpayConfig.merchantID,
      hashKey: allpayConfig.hashKey,
      hashIV: allpayConfig.hashIV,
      debug: allpayConfig.debug,
      prod: environment === 'production',
      ReturnURL: allpayConfig.ReturnURL,
      ClientBackURL: allpayConfig.ClientBackURL,
      PaymentInfoURL: allpayConfig.PaymentInfoURL,
      allpayModel: Allpay,
    });


  } catch (e) {
    console.error(e);
  }
};
