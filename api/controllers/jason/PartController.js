module.exports = {

  index: async function(req, res) {
    try {
      const groupId = req.params.groupId;
      const page = ~~req.params.page;
      const partGroups = await Group.findWithType('part');
      const pageData = await PostService.getPostsInPage({
        groupId,
        page,
        size: 6,
        contentType: Part
      });
      const maxPage = pageData.maxPage;
      const nextPage = pageData.nextPage;
      const prevPage = pageData.prevPage;
      if(page < 1 || (maxPage !== 0 && page > maxPage)){
        res.redirect(`part/group/${groupId}/page/1`);
        return;
      }
      for (let value of pageData.posts) {
        let images = await Image.findAll({
          where: {
            PartId: value.id
          },
          order: ['sequence', ['id', 'DESC']],
        });
        value.Images = images;
      }
      return res.view({
        partGroups,
        posts: pageData.posts,
        maxPage,
        page,
        prevPage,
        nextPage,
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },

  show: async function(req, res) {
    try {
      const partId = req.params.partId;
      const part = await Part.findOne({
        where: {
          id: partId,
        },
        include: [
          {
            model: File,
            order: 'sequence'
          },
          Post,
        ],
      });
      part.content = part.Post.content;
      const partImages = await Image.findAll({
        where: {
          PartId: part.id,
        },
        order: 'sequence',
      });
      const prevPart = await await Part.findOne({
        where: {
          id: {
            $lt: partId,
          },
        },
        order: 'id DESC',
      });
      const nextPart = await await Part.findOne({
        where: {
          id: {
            $gt: partId,
          },
        },
        order: 'id',
      });
      const partGroups = await Group.findWithType('part');

      return res.view({
        part,
        partImages,
        partGroups,
        nextPart,
        prevPart,
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },

}
