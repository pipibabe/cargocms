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

      // option_value_id: {
      //   Sequelize.INTEGER(11),
      //   allowNull: false
      // },

      quantity: {
        Sequelize.INTEGER(3),
        allowNull: false
      },

      subtract: {
        Sequelize.BOOLEAN,
        allowNull: false
      },

      price: {
        Sequelize.DECIMAL(15,4),
        allowNull: false
      },

      price_prefix: {
        Sequelize.STRING(1),
        allowNull: false
      },

      points: {
        Sequelize.INTEGER(8),
        allowNull: false
      },

      points_prefix: {
        Sequelize.STRING(1),
        allowNull: false
      },

      weight: {
        Sequelize.DECIMAL(15,8),
        allowNull: false
      },

      weight_prefix: {
        Sequelize.STRING(1),
        allowNull: false
      },

  },
  associations: function() {

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
