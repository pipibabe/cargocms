module.exports = {

  index: async function(req, res) {
    try {
      const groupId = req.params.groupId;
      const page = ~~req.params.page;
      const productGroups = await Group.findWithType('product');
      const pageData = await PostService.getPostsInPage({
        groupId,
        page,
        size: 6,
        contentType: Product
      });
      const maxPage = pageData.maxPage;
      const nextPage = pageData.nextPage;
      const prevPage = pageData.prevPage;
      if(page < 1 || (maxPage !== 0 && page > maxPage)){
        res.redirect(`product/group/${groupId}/page/1`);
        return;
      }
      return res.view({
        productGroups,
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
      const productId = req.params.productId;
      const product = await Post.findOne({
        where: {
          id: productId,
        },
        include: [ Product ],
      });
      const productGroups = await Group.findWithType('product');

      return res.view({
        product,
        productGroups,
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },

}
