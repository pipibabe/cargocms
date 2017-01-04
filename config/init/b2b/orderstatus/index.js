module.exports.init = async () => {
  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {
      const orderStatusData = [
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

      await OrderStatus.bulkCreate(orderStatusData);
    }
  } catch (e) {
    console.error(e);
  }
};
