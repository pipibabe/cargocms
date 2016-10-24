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
            PartId: value.Part.id
          },
          order: 'sequence'
        });
        value.Part.Images = images;
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
      const part = await Post.findOne({
        where: {
          id: partId,
        },
        include: [{
          model: Part,
          include: [{
            model: File,
            order: 'sequence'
          }]
        }],
      });
      const partImages = await Image.findAll({
        where: {
          PartId: part.Part.id,
        },
        order: 'sequence',
      });
      const partGroups = await Group.findWithType('part');

      return res.view({
        part: part.Part,
        partImages,
        partGroups,
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },

}
