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

}
