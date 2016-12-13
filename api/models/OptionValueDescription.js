module.exports = {
  attributes: {
    // optionValueId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    //
    // languageId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    //
    // optionId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    name: {
      type: Sequelize.STRING(128),
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
  associations: function() {
    OptionValueDescription.belongsTo(Option);
    // OptionValueDescription.belongsTo(OptionValue);
  },
  options: {
    classMethods: {
      deleteById: async (id) => {
        try {
          return await OptionValueDescription.destroy({ where: { id } });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
    },
    instanceMethods: {},
    hooks: {}
  }
}
