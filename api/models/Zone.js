
module.exports = {
  attributes: {
    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  associations: () => {
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
