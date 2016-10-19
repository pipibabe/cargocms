module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
    },
    modelName: {
      type: Sequelize.STRING,
    },
    specification: {
      type: Sequelize.STRING,
    },
    introduction: {
      type: Sequelize.STRING,
    },
  },
  associations: () => {
    Product.belongsTo(Post);
    Product.hasMany(Image);
    Product.hasMany(File);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
