import moment from 'moment';

module.exports = {
  attributes: {
    name: Sequelize.STRING(100),
    email: Sequelize.STRING(255),
    subject: Sequelize.STRING(255),
    content: Sequelize.TEXT,
    success: Sequelize.BOOLEAN,
    phone: Sequelize.STRING(50),
    createdAt: {
      type: Sequelize.DATE,
      get: function() {
        try {
          return moment(this.getDataValue('createdAt')).format("YYYY/MM/DD HH:mm:SS");
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
  },
  associations: () => {
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
