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
      const item = await Product.findOne({
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
      const product = {
        title: data.title,
        modelName: data.modelName,
        specification: data.specification,
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
      item.product = await Part.create({...part, PostId: item.post.id});

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
      const product = {
        title: data.title,
        modelName: data.modelName,
        specification: data.specification,
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
      item.product = await Product.update(product ,{
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
      const productId = req.params.id;
      //find post id
      let postId = await Product.findById(productId)
      postId = postId.PostId;

      let item = {};
      item.part = await Product.deleteById(productId);
      item.post = await Post.deleteById(postId);
      const message = 'Delete success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  }
}
