
module.exports = {
  attributes: {},
  associations: () => {
    ZoneToGeoZon.belongsTo(Country),
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
