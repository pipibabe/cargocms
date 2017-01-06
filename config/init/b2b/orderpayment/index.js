module.exports.init = async () => {
  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {
      const orderPaymentStatusData = [
        {
          name:"NEW",
          languageId:0
        },{
          name:"PAID",
          languageId:0
        },{
          name:"PROCESSING",
          languageId:0
        },{
          name:"SHIPPED",
          languageId:0
        },{
          name:"CANCELLED",
          languageId:0
        },{
          name:"COMPLETED",
          languageId:0
        },{
          name:"DENIED",
          languageId:0
        },{
          name:"CANCELED REVERSAL",
          languageId:0
        },{
          name:"FAILED",
          languageId:0
        },{
          name:"REFUNDED",
          languageId:0
        },{
          name:"REVERSED",
          languageId:0
        },{
          name:"CHARGEBACK",
          languageId:0
        },{
          name:"PENDING",
          languageId:0
        },{
          name:"VOIDED",
          languageId:0
        },{
          name:"PROCESSED",
          languageId:0
        },{
          name:"EXPIRED",
          languageId:0
        }
      ]

      await OrderPaymentStatus.bulkCreate(orderPaymentStatusData);

      let orderPayment1 = await OrderPayment.create({
        paymentFirstname: '大明',
        paymentLastname: '王',
        paymentCompany: '',
        paymentAddress1: '西區臺灣大道',
        paymentAddress2: '',
        paymentCity: '台中',
        paymentPostcode: '403',
        paymentCountry: '台灣',
        paymentCountryId: 0,
        paymentZone: '',
        paymentZoneId: 0,
        paymentAddressFormat: '',
        paymentCustomField: '',
        paymentMethod: '信用卡',
        paymentCode: '24fd35ed',
        status: 'PAID',
        OrderPaymentStatusId: 2
      });

      let orderPayment2 = await OrderPayment.create({
        paymentFirstname: '尼爾',
        paymentLastname: '林',
        paymentCompany: '',
        paymentAddress1: '西區臺灣大道',
        paymentAddress2: '',
        paymentCity: '台中',
        paymentPostcode: '403',
        paymentCountry: '台灣',
        paymentCountryId: 0,
        paymentZone: '',
        paymentZoneId: 0,
        paymentAddressFormat: '',
        paymentCustomField: '',
        paymentMethod: '信用卡',
        paymentCode: 'ke53kri9',
        status: 'PAID',
        OrderPaymentStatusId: 2
      });

      let orderPaymentHistory1 = await OrderPaymentHistory.create({
        OrderPaymentId: orderPayment1.id,
        OrderPaymentStatusId: 2,
        status: 'PAID',
        comment: '測試資料使用信用卡付款',
        notify: true,
      });

      let orderPaymentHistory2 = await OrderPaymentHistory.create({
        OrderPaymentId: orderPayment2.id,
        OrderPaymentStatusId: 2,
        status: 'PAID',
        comment: '測試資料使用信用卡付款',
        notify: true,
      });


    }
  } catch (e) {
    console.error(e);
  }
};
