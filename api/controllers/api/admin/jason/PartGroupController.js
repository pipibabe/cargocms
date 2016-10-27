module.exports = {

  find: async (req, res) => {
    try {
      let { query } = req;
      const { serverSidePaging } = query;
      const modelName = 'group'
      let result;

      if (serverSidePaging) {
        result = await PagingService.process({query, modelName});
      } else {
        const items = await sails.models[modelName].findAll(query);
        result = { data: { items } };
      }
      res.ok(result);
    } catch (e) {
      res.serverError(e);
    }
  },
}
