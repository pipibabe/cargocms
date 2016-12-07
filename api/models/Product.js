module.exports = {
  attributes: {
    model: {
      Sequelize.STRING(64),
      allowNull: false,
    },

    sku: {
      Sequelize.STRING(64),
      allowNull: false,
    },

    upc: {
      Sequelize.STRING(12),
      allowNull: false,
    },

    ean: {
      Sequelize.STRING(14),
      allowNull: false,
    },

    jan: {
      Sequelize.STRING(13),
      allowNull: false,
    },

    isbn: {
      Sequelize.STRING(17),
      allowNull: false,
    },

    mpn: {
      Sequelize.STRING(64)
      ,allowNull: false,
    }
    location: {
      Sequelize.STRING(128),
      allowNull: false,
    },

    quantity: {
      Sequelize.INTEGER(4)
      ,allowNull: false,
      defaultValue: 0,
    },

    image: {
      Sequelize.STRING(255),
      defaultValue: NULL,
    },

    shipping: {
      Sequelize.BOOLEAN,
      allowNull: false
      defaultValue: 'true',
    },

    price: {
      Sequelize.DECIMAL(15,4)
      ,allowNull: false,
      defaultValue: '0.0000',
    },

    points: {
      Sequelize.INTEGER(8),
      allowNull: false,
      defaultValue: 0,
    },

    tax_class_id: {
      Sequelize.INTEGER(11),
      allowNull: false,
    },

    date_available: {
      Sequelize.DATEONLY,
      allowNull: false,
      defaultValue:Value: '0000-00-00',
    },

    weight :{
      Sequelize.DECIMAL(15,8),
      allowNull: false,
      defaultValue: '0.00000000',
    },

    weight_class_id: {
      Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },

    length: {
      Sequelize.DECIMAL(15,8),
      allowNull: false,
      defaultValue: '0.00000000',
    },

    width: {
      Sequelize.DECIMAL(15,8),
      allowNull: false,
      defaultValue: '0.00000000',
    },

    height: {
      Sequelize.DECIMAL(15,8),
      allowNull: false,
      defaultValue: '0.00000000',
    },

    length_class_id: {
      Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },

    subtract: {
      Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    minimum: {
      Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: 1,
    },

    sort_order: {
      Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },

    status: {
      Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    viewed: {
      Sequelize.INTEGER(5),
      allowNull: false,
      defaultValue: 0,
    },

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
