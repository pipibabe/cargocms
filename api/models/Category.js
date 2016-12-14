import moment from 'moment';

module.exports = {
  attributes: {
    image: {
      type: Sequelize.STRING(255),
      defaultValue: null
    },
    // parentId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    //   defaultValue: 0
    // },
    top: {
      type:  Sequelize.INTEGER(1),
      allowNull: false,
    },
    column: {
      type: Sequelize.INTEGER(3),
      allowNull: false,
    },
    sortOrder: {
      type: Sequelize.INTEGER(3),
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
    },
    createdDateTime: {
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('createdAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    },
    updatedDateTime: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('updatedAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    },
  },
  associations: function() {
    Category.belongsToMany(Product, {
      through: 'ProductCategory',
    });
    Category.hasOne(CategoryDescription);
    Category.belongsTo(Category, { as: 'Parent' });
  },
  options: {
    paranoid: true,
    classMethods: {
      deleteById: async (id) => {
        try {
          return await Category.destroy({ where: { id } });
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
