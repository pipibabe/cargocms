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
      const item = await Part.findOne({
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
      const part = {
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
      item.part = await Part.create({...part, PostId: item.post.id});
      await Image.update({ PartId: item.part.id }, {
        where: { id: image.ids }
      });

      if(data.fileId) {
        await File.update({ PartId: item.part.id }, {
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
      const part = {
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
        ids: data.postCovers ? data.postCovers.map((data) => {
          return parseInt(data.id, 10)
        }) : [],
      }

      let item = {};
      item.part = await Part.update(part ,{
        where: { id }
      });
      item.post = await Post.update(post ,{
        where: {
          id: data.PostId,
        }
      })
      await Image.update({ PartId: null }, {
        where: { id: { $notIn: image.ids }, PartId: id}
      });
      await Image.update({ PartId: id }, {
        where: { id: image.ids }
      });

      if(data.fileId === '') {
        await File.update({ PartId: null }, {
          where: { PartId: id }
        });
      } else {
        await File.update({ PartId: id }, {
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
      const partId = req.params.id;
      //find post id
      let postId = await Part.findById(partId)
      postId = postId.PostId;

      let item = {};
      item.part = await Part.deleteById(partId);
      item.post = await Post.deleteById(postId);
      const message = 'Delete success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  }
}
