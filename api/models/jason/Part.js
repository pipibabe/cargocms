module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
    },
    modelName: {
      type: Sequelize.STRING,
    },
    specification: {
      type: Sequelize.STRING,
    },
    introduction: {
      type: Sequelize.STRING,
    },
    postTitle: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const post = this.getDataValue('Post');
          let postTitle = '';
          if(post){
            postTitle = post.title;
          }
          return postTitle;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    postContent: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const post = this.getDataValue('Post');
          let postContent = '';
          if(post){
            postContent = post.content;
          }
          return postContent;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    postUrl: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const post = this.getDataValue('Post');
          let postUrl = '';
          if(post){
            postUrl = post.url;
          }
          return postUrl;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    postAbstract: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const post = this.getDataValue('Post');
          let postAbstract = '';
          if(post){
            postAbstract = post.abstract;
          }
          return postAbstract;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    postCoverType: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const post = this.getDataValue('Post');
          let postCoverType = '';
          if(post){
            postCoverType = post.coverType;
          }
          return postCoverType;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    postCoverUrl: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const post = this.getDataValue('Post');
          let postCoverUrl = '';
          if(post){
            postCoverUrl = post.coverUrl;
          }
          return postCoverUrl;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    postType: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const post = this.getDataValue('Post');
          let postType = '';
          if(post){
            postType = post.type;
          }
          return postType;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    groupId: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const post = this.getDataValue('Post');
          let groupId = '';
          if(post && post.Group){
            groupId = post.Group.id;
          }
          return groupId;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    groupTitle: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const post = this.getDataValue('Post');
          let groupTitle = '';
          if(post && post.Group){
            groupTitle = post.Group.title;
          }
          return groupTitle;
        } catch (e) {
          sails.log.error(e);
        }
      }
    }
  },
  associations: () => {
    Part.belongsTo(Post);
    Part.hasMany(Image);
    Part.hasMany(File);
  },
  options: {
    classMethods: {
      deleteById: async (id) => {
        try {
          return await Part.destroy({ where: { id } });
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
