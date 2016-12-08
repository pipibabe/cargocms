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

      // option_value_id: {
      //   type: Sequelize.INTEGER(11),
      //   allowNull: false
      // },

      quantity: {
        type: Sequelize.INTEGER(3),
        allowNull: false
      },

      subtract: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },

      price: {
        type: Sequelize.DECIMAL(15,4),
        allowNull: false
      },

      price_prefix: {
        type: Sequelize.STRING(1),
        allowNull: false
      },

      points: {
        type: Sequelize.INTEGER(8),
        allowNull: false
      },

      points_prefix: {
        type: Sequelize.STRING(1),
        allowNull: false
      },

      weight: {
        type: Sequelize.DECIMAL(15,8),
        allowNull: false
      },

      weight_prefix: {
        type: Sequelize.STRING(1),
        allowNull: false
      },

  },
  associations: function() {
    // ProductOptionValue.belongsTo(Product);
    ProductOptionValue.belongsTo(ProductOption);
    // ProductOptionValue.belongsTo(Option);
    ProductOptionValue.belongsTo(OptionValue);
  },
  options: {
    paranoid: true,
    classMethods: {
      deleteById: async (id) => {
        try {
          return await ProductOptionValue.destroy({ where: { id } });
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
