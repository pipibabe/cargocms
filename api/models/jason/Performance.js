module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    introduction: {
      type: Sequelize.STRING,
    },
  },
  associations: () => {
    Performance.belongsTo(Post);
    Performance.hasMany(Image);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
