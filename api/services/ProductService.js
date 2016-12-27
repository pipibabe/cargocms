module.exports = {
  find: async ({start, length, category, supplier, limit}) => {
    try{
      let query = {
        include: [
          {
            model:Supplier,
            where: {
              id: supplier
            }
          }, {
            model: Category,
            where: {
              id: category
            }
          }
        ]
      };

      if ( limit === 'true'){
        query.offset = Number(start);
        query.limit = Number(length);
      }
      
      const product = await Product.findAll(query);

      return product;

    } catch (e) {
      sails.log.error(e);
    }
  }
}
