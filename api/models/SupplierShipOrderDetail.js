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
        type: Sequelize.DECIMAL(15,4),
        allowNull: false,
        
        
      },
  
      total: {
        type: Sequelize.DECIMAL(15,4),
        allowNull: false,
        
        
      },
  
      tax: {
        type: Sequelize.DECIMAL(15,4),
        allowNull: false,
        
        
      },
  
  },
  associations: () => {},
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
