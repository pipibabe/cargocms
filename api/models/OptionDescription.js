module.exports = {
  attributes: {
    // option_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    //
    // language_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
  },
  associations: function() {
    // OptionDescription.belongsTo(Option);
  },
  options: {
    classMethods: {
      deleteById: async (id) => {
        try {
          return await OptionDescription.destroy({ where: { id } });
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
