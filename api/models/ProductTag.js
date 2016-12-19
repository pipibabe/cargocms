module.exports = {
  attributes: {

    // productId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    // languageId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    tag: {
      type: Sequelize.STRING(32),
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
    // ProductTag.belongsTo(Product);
  },
  options: {
    paranoid: true,
    classMethods: {
      deleteById: async (id) => {
        try {
          return await ProductTag.destroy({ where: { id } });
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
