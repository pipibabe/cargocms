module.exports = {
  attributes: {
    
      status: {
        type: Sequelize.STRING(32),
        allowNull: false,
        
        
      },
  
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
        
        
      },
  
      notify: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        
        
      },
  
      OrderPaymentId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        
        
      },
  
      OrderPaymentStatusId: {
        type: Sequelize.INTEGER(11),
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
  associations: () => {},
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
