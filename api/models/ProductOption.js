module.exports = {
  attributes: {

    // product_option_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false
    // },

    // product_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false
    // },

    // option_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false
    // },

    value: {
      Sequelize.TEXT,
      allowNull: false
    },

    required: {
      Sequelize.BOOLEAN,
      allowNull: false
    },

  },
  associations: function() {
    ProductOption.belongsTo(Product);
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
