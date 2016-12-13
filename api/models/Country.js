
module.exports = {
  attributes: {
    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    isoCode2: {
      type: Sequelize.STRING(2),
      allowNull: false,
    },
    isoCode3: {
      type: Sequelize.STRING(3),
      allowNull: false,
    },
    addressFormat: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    postcodeRequired: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  associations: () => {
    Country.hasOne(Zone);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
