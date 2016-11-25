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
          order: ['sequence', ['id', 'DESC']],
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
      const product = await Product.findOne({
        where: {
          id: productId,
        },
        include: [
          {
            model: File,
            order: 'sequence'
          },
          Post,
        ],
      });
      product.content = product.Post.content;
      const productImages = await Image.findAll({
        where: {
          ProductId: product.id,
        },
        order: ['sequence', ['id', 'DESC']],
      });
      const nextProduct = await await Product.findOne({
        where: {
          id: {
            $lt: productId,
          },
        },
        order: 'id DESC',
      });
      const prevProduct = await await Product.findOne({
        where: {
          id: {
            $gt: productId,
          },
        },
        order: 'id',
      });
      const productGroups = await Group.findWithType('product');

      return res.view({
        product,
        productImages,
        productGroups,
        prevProduct,
        nextProduct,
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },

}
