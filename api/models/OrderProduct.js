
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
    reward: {
      type: Sequelize.INTEGER(8),
      allowNull: false,
    },

    createdDateTime:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('createdAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    },

    updatedDateTime:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('updatedAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    }
  },
  associations: () => {
    OrderProduct.belongsTo(Product);
    OrderProduct.belongsTo(Order);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
