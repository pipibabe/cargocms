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
      for (let value of pageData.posts) {
        let images = await Image.findAll({
          where: {
            ProductId: value.id
          },
          order: ['sequence', ['filePath', 'DESC']],
        });
        value.Images = images;
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
        include: [{
          model: Product,
          include: [{
            model: File,
            order: 'sequence'
          }]
        }],
      });
      product.Product.content = product.content;
      const productImages = await Image.findAll({
        where: {
          ProductId: product.Product.id,
        },
        order: ['sequence', ['filePath', 'DESC']],
      });
      const productGroups = await Group.findWithType('product');

      return res.view({
        product: product.Product,
        productImages,
        productGroups,
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },

}
