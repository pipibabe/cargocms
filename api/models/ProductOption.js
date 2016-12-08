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

  },
  associations: function() {
    // ProductOption.belongsTo(Product);
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
