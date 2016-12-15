module.exports = {
  attributes: {

    // product_option_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false
    // },

    // product_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false
    // },

    // option_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false
    // },

    value: {
      type: Sequelize.TEXT,
      allowNull: false
    },

    required: {
      type: Sequelize.BOOLEAN,
      allowNull: false
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
    ProductOption.hasOne(ProductOptionValue);
    ProductOption.belongsTo(Option);
  },
  options: {
    paranoid: true,
    classMethods: {
      deleteById: async (id) => {
        try {
          return await ProductOption.destroy({ where: { id } });
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
