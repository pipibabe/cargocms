module.exports = {
  find: async ({start, length, category, supplier}) => {
    try{
      const product = await Product.findAll({
        offset: Number(start),
        limit: Number(length),
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
      });

      return product;

    } catch (e) {
      sails.log.error(e);
    }
  }
}
