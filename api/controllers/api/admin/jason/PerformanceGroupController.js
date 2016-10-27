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
        query.where = { type: 'performance'};
        const items = await sails.models[modelName].findAll(query);
        result = { data: { items } };
      }
      res.ok(result);
    } catch (e) {
      res.serverError(e);
    }
  },
  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Group.findById(id);
      res.ok({ data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      let data = req.body;

      data.name = null;
      data.sourceId = null;
      const item = await Group.create(data);
      const message = 'Create success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      let data = req.body;
      const message = 'Update success.';

      data.name = null;
      data.sourceId = null;
      const item = await Group.update(data ,{
        where: { id, },
      });
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Group.deleteById(id);
      const message = 'Delete success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  }
}
