module.exports = {
  attributes: {
    content: Sequelize.STRING,
    source: Sequelize.STRING,
    author: Sequelize.STRING,
    type: {
      type:Sequelize.ENUM('quote', 'recommend'),
      defaultValue: 'quote'
    },
    imgUrl:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          const thisImage = this.getDataValue('Image');
          return thisImage ? thisImage.url : '';
        } catch(e){
          sails.log.error(e);
        }
      }
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
    Quote.belongsTo(Image, {
      foreignKey: {
        name: 'img'
      }
    });
  },
  options: {
    classMethods: {
      deleteById: async (id) => {
        try {
          return await Quote.destroy({ where: { id } });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
    },
    instanceMethods: {},
    hooks: {}
  }
};
