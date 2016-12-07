module.exports = {
  attributes: {
    // option_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    //
    // language_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    name: {
      Sequelize.STRING(128),
      allowNull: false,
    },
  },
  associations: function() {

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
