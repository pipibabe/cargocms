module.exports = {

  index: async function(req, res) {
    try {
      const productGroups = await Group.findWithType('product');
      const product = await Post.findProductByGroupId(1);
      product.forEach((item) => {
        console.log(item.Product.title);
      });
      return res.view({productGroups});
    }
    catch (e) {
      res.serverError(e);
    }
  },

}
