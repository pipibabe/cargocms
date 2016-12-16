
module.exports = {
  attributes: {
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    model: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(15, 4),
      defaultValue: '0.0000',
      allowNull: false,
    },
    total: {
      type: Sequelize.DECIMAL(15, 4),
      defaultValue: '0.0000',
      allowNull: false,
    },
    tax: {
      type: Sequelize.DECIMAL(15, 4),
      defaultValue: '0.0000',
      allowNull: false,
    },
    // reward: {
    //   type: Sequelize.INTEGER(8),
    //   allowNull: false,
    // },
  },
  associations: () => {
    OrderProduct.belongsTo(Product);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
