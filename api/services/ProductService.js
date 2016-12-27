module.exports = {
  find: async ({start, length, categoryId, supplierId, limit}) => {
    try{

      let query = {
        include: [
          {
            model: Category,
            where: {
              id: categoryId
            }
          }
        ]
      };

      if(supplierId){
        query.include.push({
          model: Supplier,
          where: {
            id: supplierId
          }
        });
      }

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
