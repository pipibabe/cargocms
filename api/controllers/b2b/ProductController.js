module.exports = {
  index: async (req, res) => {
    try{
      let {start, length, category, supplier, limit} = req.query;

      if( !category ){
        category = 1;
      }

      const result = await ProductService.find({
        start,
        length,
        categoryId: category,
        supplierId: supplier,
        limit
      });

      let categorys = await Category.findAll({
        include: CategoryDescription
      });

      // categorys = categorys.map(function( category ){
      //   return category.CategoryDescription.name;
      // });

      res.view('index',
        {
          data:{
            items: result,
            categorys
          }
        }
      );
    } catch (e) {
      sails.log.error(e);
    }
  },
};
