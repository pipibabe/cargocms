module.exports = {
  attributes: {
    // product_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    //
    // language_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    tag: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    metaTitle: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    metaDescription: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    metaKeyword: {
      type: Sequelize.STRING(255),
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
    // ProductDescription.belongsTo(Product);
  },
  options: {
    paranoid: true,
    classMethods: {
      deleteById: async (id) => {
        try {
          return await ProductDescription.destroy({ where: { id } });
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
