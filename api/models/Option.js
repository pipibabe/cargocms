module.exports = {
  attributes: {

    type: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },

    sortOrder: {
      type: Sequelize.INTEGER(3),
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
    Option.hasOne(ProductOption);
    Option.hasOne(OptionValue);
    Option.hasOne(OptionDescription);
    Option.hasOne(OptionValueDescription);
    Option.hasOne(ProductOptionValue);
  },
  options: {
    classMethods: {
      deleteById: async (id) => {
        try {
          return await Option.destroy({ where: { id } });
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
