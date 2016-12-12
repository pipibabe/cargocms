
module.exports = {
  attributes: {
    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    iso_code_2: {
      type: Sequelize.STRING(2),
      allowNull: false,
    },
    iso_code_3: {
      type: Sequelize.STRING(3),
      allowNull: false,
    },
    address_format: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    postcode_required: {
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
    Country.hasOne(Zone),
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
