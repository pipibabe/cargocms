
module.exports = {
  attributes: {
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    value: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING(32),
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
