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
            const thisImage = this.getDataValue('Image');
            return thisImage ? thisImage.url : '/assets/jason/images/default_icon.jpg';
          } else {
            return this.getDataValue('coverUrl');
          }
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    type: {
      type: Sequelize.ENUM('product', 'part', 'performance'),
    },
    TagsArray: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const thisTags = this.getDataValue('Tags');
          const tags = thisTags ? thisTags.map((tag) => tag.title) : [];
          return tags;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    updatedAt: {
      type: Sequelize.DATE,
      get: function() {
        try {
          return moment(this.getDataValue('updatedAt')).format("YYYY/MM/DD HH:mm:SS");
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
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
    Post.belongsToMany(Tag,  {
      through: 'PostTag',
      foreignKey: {
        name: 'PostId',
        as: 'Tags'
      }
    }),
    Post.hasOne(Image, {
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
    Post.belongsTo(Group);
    Post.hasOne(Product);
    Post.hasOne(Part);
    Post.hasOne(Performance);
  },
  options: {
    classMethods: {
      findItemsByGroupId: async (itemType, groupId, offset = 0, limit) => {
        try {
          return await Post.findAll({
            offset,
            limit,
            include: [{
              model: Group,
              where: {
                id: groupId
              }
            }, {
              model: itemType,
              required: true
            }],
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
      findAllItems: async (itemType, offset = 0, limit) => {
        try {
          return await Post.findAll({
            offset,
            limit,
            include: [{
              model: itemType,
              required: true
            }],
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
      createItem: async ({
        title,
        modelName,
        specification,
        introduction,
        groupId,
        itemType,
        imageFilePath,
      }) => {
        try {
          let post = await Post.create({
            title: '新產品',
            content: '詳細說明',
            type: itemType.getTableName().toLowerCase(),
            GroupId: groupId,
            coverType: 'img',
          });
          return await itemType.create({
            title,
            modelName,
            specification,
            introduction,
            PostId: post.id,
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
      createPerformance: async ({
        title,
        location,
        introduction,
        groupId,
        imageFilePath,
      }) => {
        try {
          let post = await Post.create({
            title: '新實蹟',
            content: '詳細說明',
            type: Performance.getTableName().toLowerCase(),
            GroupId: groupId,
            coverType: 'img',
          });
          return await Performance.create({
            title,
            location,
            introduction,
            PostId: post.id,
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
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
