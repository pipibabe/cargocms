module.exports = {
  attributes: {
    // option_value_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    //
    // language_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    //
    // option_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    name: {
      Sequelize.STRING(128),
      allowNull: false,
    },
  },
  associations: function() {
    OptionValueDescription.belongsTo(Option);
    OptionValueDescription.belongsTo(OptionValue);
  },
  options: {
    classMethods: {
      deleteById: async (id) => {
        try {
          return await OptionValueDescription.destroy({ where: { id } });
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
