module.exports = {

  index: async function(req, res) {
    try {
      const groupId = req.params.groupId;
      const page = ~~req.params.page;
      const productGroups = await Group.findWithType('product');
      const pageData = await PostService.getPostsInPage({
        groupId,
        page,
        size: 8,
      });
      const maxPage = pageData.maxPage;
      const nextPage = (page === maxPage) ? page : page+1;
      const prevPage = (page === 1) ? page : page-1;
      if(maxPage !== 0 && page > maxPage){
        res.redirect(`product/group/${groupId}/page/1`);
        return;
      }
      return res.view({
        productGroups,
        products: pageData.products,
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
