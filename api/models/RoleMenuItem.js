module.exports = {
  attributes: {
    
      roleId: {
        type: Sequelize.STRING(32),
        allowNull: false,
        
        
      },
  
      menuItemId: {
        type: Sequelize.STRING(32),
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
