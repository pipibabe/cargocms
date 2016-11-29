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
    alias: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        is: {
          args: /^[a-zA-Z0-9-]+$/i,
          msg: '可讀網址只允許英文、數字、符號"-"'
        },
      }
    },
    abstract: {
      type: Sequelize.STRING,
    },
    coverType: {
      type: Sequelize.ENUM('img', 'video'),
      defaultValue: 'img',
    },
    type: {
      type: Sequelize.ENUM('blog', 'internal-event', 'external-event'),
      defaultValue: 'blog',
    },
    typeDesc: {
      type: Sequelize.VIRTUAL,
      get: function() {
        let desc = '';
        switch (this.type) {
          case 'blog':
            desc = '部落格';
            break;
          case 'internal-event':
            desc = '活動';
            break;
          case 'external-event':
            desc = '外部活動';
            break;
          default:
            desc = '';
        }
        return desc;
      }
    },

    coverUrl: {
      type: Sequelize.STRING,
      get: function() {
        try {
          if (this.coverType === 'img') {
            const thisImage = this.getDataValue('Image');
            return thisImage ? thisImage.url : '';
          } else {
            return this.getDataValue('coverUrl');
          }
        } catch (e) {
          sails.log.error(e);
        }
      }
    },

    publish: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
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
    createdDateTime:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('createdAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    },

    updatedDateTime:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('updatedAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    }

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
      findAllHasJoin: async ({order, offset, limit, where}) => {
        try {
          if(where == undefined) where = {};
          return await Post.findAll({
            where,
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
      findByIdHasJoin: async ({id}) => {
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
      findByIdHasJoinByEvent: async ({id, name}) => {
        try {
          return await Post.findOne({
            where: { $or: [{ id: id || name }, { alias: name }] },
            include: [ Tag, Image, User, Location, Event]
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
