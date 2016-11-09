module.exports = {
  attributes: {
    filePath: {
      type: Sequelize.STRING,
    },
    size: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING(30),
    },
    storage: {
      type: Sequelize.ENUM('local', 's3', 'url'),
      defaultValue: 'local',
    },
    note: {
      type: Sequelize.STRING,
    },
    sequence: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    fileName: {
      type: Sequelize.VIRTUAL,
      get: function() {
        let thisFilePath = this.getDataValue('filePath');
        if (thisFilePath){
          thisFilePath = thisFilePath.split('/uploads/')[1];
        }
        return thisFilePath;
      }
    },
    url: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const thisFilePath = this.getDataValue('filePath');
          const thisStorage = this.getDataValue('storage');
          if (thisFilePath && thisStorage === 'local') {
            return thisFilePath.split('/public')[1];
          } else if (thisFilePath && thisStorage ==='url') {
            return thisFilePath;
          } else {
            sails.log.warn('Not implemented');
            return thisFilePath;
          }
        } catch (e) {
          sails.log.error(e);
        }
      }
    }
  },
  associations: () => {
    Image.belongsTo(Product);
    Image.belongsTo(Part);
    Image.belongsTo(Performance);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
