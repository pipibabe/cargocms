
module.exports = {
  attributes: {
    language_id:{
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    name:{
      type: Sequelize.ENUM('Processing','Shipped','Canceled','Complete','Denied','Reversal','Failed','Refunded','Reversed','Chargeback','Pending','Voided','Processed','Expired'),
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
