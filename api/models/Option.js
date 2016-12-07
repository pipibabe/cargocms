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
