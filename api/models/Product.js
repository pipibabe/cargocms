module.exports = {
  attributes: {
    model: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },

    sku: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },

    upc: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },

    ean: {
      type: Sequelize.STRING(14),
      allowNull: false,
    },

    jan: {
      type: Sequelize.STRING(13),
      allowNull: false,
    },

    isbn: {
      type: Sequelize.STRING(17),
      allowNull: false,
    },

    mpn: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },

    location: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },

    quantity: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
      defaultValue: 0,
    },

    image: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },

    shipping: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    price: {
      type: Sequelize.DECIMAL(15,4),
      allowNull: false,
      defaultValue: '0.0000',
    },

    points: {
      type: Sequelize.INTEGER(8),
      allowNull: false,
      defaultValue: 0,
    },

    // tax_class_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    date_available: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: '1970-01-01',
    },

    weight :{
      type: Sequelize.DECIMAL(15,8),
      allowNull: false,
      defaultValue: '0.00000000',
    },

    // weight_class_id: {
    //   Sequelize.INTEGER(11),
    //   allowNull: false,
    //   defaultValue: 0,
    // },

    length: {
      type: Sequelize.DECIMAL(15,8),
      allowNull: false,
      defaultValue: '0.00000000',
    },

    width: {
      type: Sequelize.DECIMAL(15,8),
      allowNull: false,
      defaultValue: '0.00000000',
    },

    height: {
      type: Sequelize.DECIMAL(15,8),
      allowNull: false,
      defaultValue: '0.00000000',
    },

    // length_class_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    //   defaultValue: 0,
    // },

    subtract: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    minimum: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: 1,
    },

    sort_order: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },

    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    viewed: {
      type: Sequelize.INTEGER(5),
      allowNull: false,
      defaultValue: 0,
    },

    // stock_status_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    // manufacturer_id: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

  },
  associations: function() {

  },
  options: {
    paranoid: true,
    classMethods: {
      deleteById: async (id) => {
        try {
          return await Product.destroy({ where: { id } });
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
