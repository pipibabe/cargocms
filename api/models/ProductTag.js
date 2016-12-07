module.exports = {
  attributes: {

    // product_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    //
    // language_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    tag: {
      Sequelize.STRING(32),
      allowNull: false,
    },

  },
  associations: function() {
    ProductTag.belongsTo(Product);
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
