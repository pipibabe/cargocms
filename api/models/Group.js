module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      validate: {
        isAlphanumeric: true,
      },
    },
    sequence: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    type: {
      type: Sequelize.ENUM('product', 'part', 'performance'),
    },
    sourceId: Sequelize.INTEGER,
  },
  associations: () => {
    Group.hasMany(Post);
  },
  options: {
    classMethods: {
      findWithType: async (type) => {
        const groups = await Group.findAll({
          where: {
            type
          },
          order: 'sequence'
        });
        return groups;
      }
    },
    instanceMethods: {},
    hooks: {}
  }
};
