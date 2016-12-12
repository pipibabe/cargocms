
module.exports = {
  attributes: {
    firstname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    company: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    address1: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    address2: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    postcode: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    customField: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
  },
  associations: () => {
    Address.belongsTo(User);
    Address.hasOne(Country);
    Address.hasOne(Zone);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
