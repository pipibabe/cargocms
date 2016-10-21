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
    fileName: {
      type: Sequelize.VIRTUAL,
      get: function() {
        const thisFilePath = this.getDataValue('filePath');
        return thisFilePath.split('/uploads/')[1];
      }
    },
    url: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const thisFilePath = this.getDataValue('filePath');
          if (this.storage === 'local') {
            return thisFilePath.split('/public')[1];
          } else if (this.storage ==='url') {
            return thisFilePath;
          } else {
            throw Error('Not implemented');
          }
        } catch (e) {
          salis.log.error(e);
        }
      }
    }
  },
  associations: () => {
    Image.belongsTo(Product);
    Image.belongsTo(Part);
    Image.belongsTo(Performance);
    Image.belongsTo(Post);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
