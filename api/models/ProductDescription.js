module.exports = {
  attributes: {
    // product_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    //
    // language_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    tag: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    metaTitle: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    metaDescription: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    metaKeyword: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  },
  associations: function() {
    // ProductDescription.belongsTo(Product);
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
