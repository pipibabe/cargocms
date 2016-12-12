
module.exports = {
  attributes: {},
  associations: () => {
    ZoneToGeoZon.belongsTo(Country),
    ZoneToGeoZon.hasOne(GeoZone),
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
