
module.exports = {
  attributes: {
    name: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(255),
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
