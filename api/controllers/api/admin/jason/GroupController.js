module.exports = {

  find: async (req, res) => {
    try {
      let { query } = req;
      const { group } = req.params;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      query.where = { type: group };
      
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
