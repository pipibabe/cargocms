module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING
    }
  },
  associations: function() {
    //Feeling.belongsTo(Scent);
  },
  options: {
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
