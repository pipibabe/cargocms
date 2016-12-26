module.exports = {
  attributes: {

      paymentFirstname: {
        type: Sequelize.STRING(32),
        allowNull: false,


      },

      paymentLastname: {
        type: Sequelize.STRING(32),
        allowNull: false,


      },

      paymentCompany: {
        type: Sequelize.STRING(32),
        allowNull: false,


      },

      paymentAddress1: {
        type: Sequelize.STRING(128),
        allowNull: false,


      },

      paymentAddress2: {
        type: Sequelize.STRING(128),
        allowNull: false,


      },

      paymentCity: {
        type: Sequelize.STRING(128),
        allowNull: false,


      },

      paymentPostcode: {
        type: Sequelize.STRING(10),
        allowNull: false,


      },

      paymentCountry: {
        type: Sequelize.STRING(128),
        allowNull: false,


      },

      paymentCountryId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,


      },

      paymentZone: {
        type: Sequelize.STRING(128),
        allowNull: false,


      },

      paymentZoneId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,


      },

      paymentAddressFormat: {
        type: Sequelize.TEXT,
        allowNull: false,


      },

      paymentCustomField: {
        type: Sequelize.TEXT,
        allowNull: false,


      },

      paymentMethod: {
        type: Sequelize.STRING(128),
        allowNull: false,


      },

      paymentCode: {
        type: Sequelize.STRING(128),
        allowNull: false,


      },

      status: {
        type: Sequelize.STRING(32),
        allowNull: false,


      },

      // OrderStatusId: {
      //   type: Sequelize.INTEGER(11),
      //   allowNull: false,
      //
      //
      // },


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
  associations: () => {},
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
