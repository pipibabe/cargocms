import moment from 'moment';
module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
    },
    url: {
      type: Sequelize.STRING,
    },
    abstract: {
      type: Sequelize.STRING,
    },
    coverType: {
      type: Sequelize.ENUM('img', 'video'),
      defaultValue: 'img',
    },
    coverUrl: {
      type: Sequelize.STRING,
      get: function() {
        try {
          if (this.coverType === 'img') {
            return this.Image ? this.Image.url : '';
          } else {
            return this.getDataValue('coverUrl');
          }
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    TagsArray: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const tags = this.Tags ? this.Tags.map((tag) => tag.title) : [];
          return tags;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    createdAtFormat: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          return moment(this.createdAt).format("YYYY/MM/DD");
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
  },
  associations: () => {
    Post.belongsToMany(Tag,  {
      through: 'PostTag',
      foreignKey: {
        name: 'PostId',
        as: 'Tags'
      }
    }),
    Post.belongsTo(Image, {
      foreignKey: {
        name: 'cover'
      }
    });
    Post.belongsTo(User, {
      foreignKey: {
        name: 'UserId'
      }
    });
    Post.belongsTo(Location);
  },
  options: {
    classMethods: {
      findAllHasJoin: async (order, offset, limit) => {
        try {
          return await Post.findAll({
            offset,
            limit,
            order: [['createdAt', order || 'DESC']],
            include: [Tag, Image, User, Location],
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
      findByIdHasJoin: async (id) => {
        try {
          return await Post.findOne({
            where: { id },
            include: [ Tag, Image, User, Location]
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
      findByTagId: async (id) => {
        try {
          return await Post.findAll({
            include: {
              model: Tag,
              where: { id },
            }
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
      deleteById: async (id) => {
        try {
          return await Post.destroy({ where: { id } });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
    },
    instanceMethods: {},
    hooks: {}
  }
};
