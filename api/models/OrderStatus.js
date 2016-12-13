
module.exports = {
  attributes: {
    language_id:{
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    name:{
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
