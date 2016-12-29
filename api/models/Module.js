module.exports = {
  attributes: {
    
      name: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
  
      width: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
  
      height: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
  
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
  
      settings: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    //
      // module_type_id: {
      //   type: Sequelize.STRING(11),
      //   allowNull: false,
      //
      //
      // },
    //

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
    // Module.belongsToMany(Layout,{
    //   through: 'LayoutModule',
    // });
    Module.belongsTo(ModuleType);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
