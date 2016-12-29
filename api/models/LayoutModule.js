module.exports = {
  attributes: {
    
      sort_order: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
      },

      // layout_id: {
      //   type: Sequelize.INTEGER(11),
      //   allowNull: false,
      // },
      //
      // module_id: {
      //   type: Sequelize.INTEGER(11),
      //   allowNull: false,
      // },
      //
      // position_id: {
      //   type: Sequelize.INTEGER(11),
      //   allowNull: false,
      // },
  

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
    LayoutModule.belongsTo(Position);
    LayoutModule.belongsTo(Module);
    // LayoutModule.hasMany(Layout);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
