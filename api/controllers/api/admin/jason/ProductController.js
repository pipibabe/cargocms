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
        include: [{
          model: Post,
          include: Group
        }, {
          model: Image,
        }, {
          model: File,
        }]
      });

      res.ok({ data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      sails.log.debug(data);
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
        // coverType: data.postCoverType,
        // coverUrl: data.postCoverUrl,
        type: data.postType
      };
      if (!data.postCovers || data.postCovers.length === 0) {
        throw Error('請至少上傳一張圖片')
      }
      const image = {
        ids: data.postCovers ? data.postCovers.map((data) => data.id) : [],
      }
      let item = {};
      item.post = await Post.create({...post, GroupId: data.groupId});
      item.product = await Product.create({...product, PostId: item.post.id});
      await Image.update({ ProductId: item.product.id }, {
        where: { id: image.ids }
      });

      if(data.fileId) {
        await File.update({ ProductId: item.product.id }, {
          where: { id: data.fileId }
        });
      }

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
        // coverType: data.postCoverType,
        // coverUrl: data.postCoverUrl,
        type: data.postType,
        GroupId: data.groupId
      };
      if (!data.postCovers || data.postCovers.length === 0) {
        throw Error('請至少上傳一張圖片')
      }
      const image = {
        ids:  data.postCovers ? data.postCovers.map((data) => {
          return parseInt(data.id, 10)
        }) : [],
      }

      let item = {};
      item.product = await Product.update(product ,{
        where: { id }
      });
      item.post = await Post.update(post ,{
        where: { id }
      })
      await Image.update({ ProductId: null }, {
        where: { id: { $notIn: image.ids }, ProductId: id}
      });
      await Image.update({ ProductId: id }, {
        where: { id: image.ids }
      });

      if(data.fileId === '') {
        await File.update({ ProductId: null }, {
          where: { ProductId: id }
        });
      } else {
        await File.update({ ProductId: id }, {
          where: { id : data.fileId }
        });
      }

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
