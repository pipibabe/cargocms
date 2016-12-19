module.exports = {
  attributes: {

    // productId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    image: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },

    sortOrder: {
      type: Sequelize.INTEGER(3),
      allowNull: false,
      defaultValue: 0,
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
    ProductImage.belongsTo(Image);
  },
  options: {
    classMethods: {
      deleteById: async (id) => {
        try {
          return await ProductImage.destroy({ where: { id } });
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
