module.exports = {

  find: async (req, res) => {
    try {
      const { query } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      if (serverSidePaging) {
        const include = {
          model: Post,
          include: Group
        };
        result = await PagingService.process({query, modelName, include});
      } else {
        const items = await sails.models[modelName].findAll({
          include: {
            model: Post,
            include: Group
          }
        });
        result = { data: { items } };
      }
      res.ok(result);
    } catch (e) {
      res.serverError(e);
    }
  },

  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Performance.findOne({
        where: {
          id
        },
        include: {
          model: Post,
          include: Group
        }
      });

      res.ok({ data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      const performance = {
        title: data.title,
        location: data.location,
        introduction: data.introduction
      };
      const post = {
        title: data.postTitle,
        content: data.postContent,
        url: data.postUrl,
        abstract: data.postAbstract,
        coverType: data.postCoverType,
        coverUrl: data.postCoverUrl,
        type: data.postType
      };
      let item = {};
      item.post = await Post.create({...post, GroupId: data.groupId});
      item.performance = await Performance.create({...performance, PostId: item.post.id});

      const message = 'Create success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const performance = {
        title: data.title,
        location: data.location,
        introduction: data.introduction
      };
      const post = {
        title: data.postTitle,
        content: data.postContent,
        url: data.postUrl,
        abstract: data.postAbstract,
        coverType: data.postCoverType,
        coverUrl: data.postCoverUrl,
        type: data.postType,
        groupId: data.groupId
      };

      let item = {};
      item.performance = await Performance.update(performance ,{
        where: { id }
      });
      item.post = await Post.update(post ,{
        where: { id }
      })
      const message = 'Update success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const performanceId = req.params.id;
      //find post id
      let postId = await Performance.findById(performanceId)
      postId = postId.PostId;

      let item = {};
      item.performance = await Performance.deleteById(performanceId);
      item.post = await Post.deleteById(postId);
      const message = 'Delete success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  }
}
