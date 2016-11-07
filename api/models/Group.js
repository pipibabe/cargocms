module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING
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
          order: ['sequence', ['id', 'DESC']]
        });
        return groups;
      },
      deleteById: async (id) => {
        try {
          return await Group.destroy({ where: { id } });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      }
    },
    instanceMethods: {},
    hooks: {}
  }
};
