module.exports = {
  attributes: {

      name: {
        type: Sequelize.ENUM('NEW','PAID','PROCESSING','SHIPPED','DELIVERED','CANCELED','COMPLETE', 'SUBMITTED','DENIED','CANCELED REVERSAL','FAILED','REFUNDED','REVERSED','CHARGEBACK','PENDING','VOIDED','PROCESSED','EXPIRED'),
        allowNull: false,


      },

      languageId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,


      },


    createdDateTime:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('createdAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    },

    updatedDateTime:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('updatedAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    }
  },
  associations: () => {
    OrderPaymentStatus.hasMany(OrderPayment);
    OrderPaymentStatus.hasMany(OrderPaymentHistory);

  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
