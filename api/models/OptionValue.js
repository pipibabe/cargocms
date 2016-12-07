module.exports = {
  attributes: {
    
    // option_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false
    // },

    image: {
      Sequelize.STRING(255),
      allowNull: false
    },

    sort_order: {
      Sequelize.INTEGER(3),
      allowNull: false
    },
  },
  associations: function() {

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
