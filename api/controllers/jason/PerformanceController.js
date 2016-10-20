module.exports = {

  index: async function(req, res) {
    try {
      const groupId = req.params.groupId;
      const page = ~~req.params.page;
      const performanceGroups = await Group.findWithType('performance');
      const pageData = await PostService.getPostsInPage({
        groupId,
        page,
        size: 6,
        contentType: Performance
      });
      const maxPage = pageData.maxPage;
      const nextPage = pageData.nextPage;
      const prevPage = pageData.prevPage;
      if(page < 1 || (maxPage !== 0 && page > maxPage)){
        res.redirect(`performance/group/${groupId}/page/1`);
        return;
      }
      return res.view({
        performanceGroups,
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
      const performanceId = req.params.performanceId;
      const performance = await Post.findOne({
        where: {
          id: performanceId,
        },
        include: [ Performance ],
      });
      const performanceGroups = await Group.findWithType('performance');

      return res.view({
        performance,
        performanceGroups,
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },

}
