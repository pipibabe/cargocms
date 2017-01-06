
module.exports = {
  attributes: {
    notify: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  associations: () => {
    OrderHistory.belongsTo(Order);
    OrderHistory.belongsTo(OrderStatus);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
