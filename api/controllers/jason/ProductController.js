module.exports = {

  index: async function(req, res) {
    try {
      let products;
      if(req.query.type){
        products = await Post.findProductByGroupId(req.query.type);
      }else{
        products = await Post.findAllProduct();
      }
      products.forEach((e)=>{
        console.log(e.Product);
      })
      const productGroups = await Group.findWithType('product');
      return res.view({ productGroups, products });
    }
    catch (e) {
      res.serverError(e);
    }
  },

}
