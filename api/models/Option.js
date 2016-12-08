module.exports = {
  attributes: {

    type: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },

    sort_order: {
      type: Sequelize.INTEGER(3),
      allowNull: false,
    },

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
