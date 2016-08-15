module.exports = {
  attributes: {
    longitude: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      validate: { min: -180, max: 180 }
    },
    latitude: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      validate: { min: -90, max: 90 }
    }
  },
  associations: () => {
    Location.hasMany(Post,  {
      foreignKey: {
        name: 'LocationId',
      }
    });
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
