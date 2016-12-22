
module.exports = {
  attributes: {
    languageId:{
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    name:{
      type: Sequelize.ENUM('NEW','PAID','PROCESSING','SHIPPED','CANCELED','COMPLETE','DENIED','CANCELED REVERSAL','FAILED','REFUNDED','REVERSED','CHARGEBACK','PENDING','VOIDED','PROCESSED','EXPIRED'),
      allowNull: false,
    },
  },
  associations: () => {
    OrderStatus.belongsTo(Order);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
