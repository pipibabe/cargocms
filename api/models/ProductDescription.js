module.exports = {
  attributes: {
    // product_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    //
    // language_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    name: {
      Sequelize.STRING(255),
      allowNull: false,
    },

    description: {
      Sequelize.TEXT,
      allowNull: false,
    },

    tag: {
      Sequelize.TEXT,
      allowNull: false,
    },

    meta_title: {
      Sequelize.STRING(255),
      allowNull: false,
    },

    meta_description: {
      Sequelize.STRING(255),
      allowNull: false,
    },

    meta_keyword: {
      Sequelize.STRING(255),
      allowNull: false,
    },
  },
  associations: function() {

  },
  options: {
    paranoid: true,
    classMethods: {
      deleteById: async (id) => {
        try {
          return await ProductDescription.destroy({ where: { id } });
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
