
module.exports = {
  attributes: {
    languageId:{
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    name:{
      type: Sequelize.ENUM('NEW','PAID','PROCESSING','SHIPPED','CANCELLED','COMPLETE','DENIED','CANCELED REVERSAL','FAILED','REFUNDED','REVERSED','CHARGEBACK','PENDING','VOIDED','PROCESSED','EXPIRED'),
      allowNull: false,
    },
  },
  associations: () => {
    OrderStatus.hasOne(Order);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
