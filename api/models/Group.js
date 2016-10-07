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
    },
    type: {
      type: Sequelize.ENUM('product', 'part', 'performance'),
    },
  },
  associations: () => {
    Group.hasMany(Post);
  },
  options: {
    classMethods: {
      findWithType: (type) => {
        const groups = await Group.find({
          where: {
            type
          },
        });
        return groups;
      }
    },
    instanceMethods: {},
    hooks: {}
  }
};
