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
    Part.belongsTo(Post);
    // Part.hasMany(Image);
    Part.hasMany(File);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
