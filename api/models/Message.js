
module.exports = {
  attributes: {
    sendBy: Sequelize.ENUM(
      'email',
      'sms'
    ),
    type: Sequelize.ENUM(
      'greeting',
      'orderConfirm',
      'paymentConfirm',
      'deliveryConfirm',
      'orderSync',
      'forgotPassword',
      'contact',
      'newEmail'
    ),
    from: Sequelize.STRING,
    to: Sequelize.STRING,
    subject: Sequelize.STRING,
    text: Sequelize.TEXT,
    html: Sequelize.TEXT,
    success: Sequelize.BOOLEAN,
    error: Sequelize.STRING,
    
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
  },
  options: {
    classMethods: {
      deleteById: async (id) => {
        try {
          return await Message.destroy({ where: { id } });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      }
    },
    instanceMethods: {},
    hooks: {}
  }
};
