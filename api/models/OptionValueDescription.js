module.exports = {
  attributes: {
    // optionValueId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    //
    // languageId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    //
    // optionId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
  },
  associations: function() {
    OptionValueDescription.belongsTo(Option);
    // OptionValueDescription.belongsTo(OptionValue);
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
