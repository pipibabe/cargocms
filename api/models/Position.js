module.exports = {
  attributes: {
    
  
      name: {
        type: Sequelize.STRING(45),
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
    Position.hasOne(LayoutModule);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
