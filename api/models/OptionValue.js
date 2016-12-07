module.exports = {
  attributes: {

    // option_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false
    // },

    image: {
      type: Sequelize.STRING(255),
      allowNull: false
    },

    sort_order: {
      type: Sequelize.INTEGER(3),
      allowNull: false
    },
  },
  associations: function() {
    OptionValue.belongsTo(Option);
  },
  options: {
    classMethods: {
      deleteById: async (id) => {
        try {
          return await OptionValue.destroy({ where: { id } });
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
