module.exports = {
  find: async (req , res) => {
    try{
      const {start, length, category, supplier} = req.query;

      const result = await ProductService.find({start, length, category, supplier});

      const message = 'Get Product Success';
      res.ok({
        message,
        data: {
          items: result
        }
      });

    } catch (e) {
      res.serverError(e);
    }
  }
}
