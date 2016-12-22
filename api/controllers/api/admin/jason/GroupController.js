module.exports = {

  selectfind: async (req, res) => {
    try {
      let { query } = req;
      const { group } = req.params;
      let result;
      const items = await Group.findAll({
        where: { type: group}
      });
      result = { data: { items } };

      res.ok(result);
    } catch (e) {
      res.serverError(e);
    }
  },

  find: async (req, res) => {
    try {
      let { query } = req;
      const group = req.query.type
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      if (serverSidePaging) {
        result = await PagingService.process({query, modelName});
      } else {
        query.where = { type: group}
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
      const data = req.body;
      // name and sourceId not be used.
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
      const data = req.body;
      // name and sourceId not be used.
      data.name = null;
      data.sourceId = null;

      const message = 'Update success.';
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
      const group = await Group.findById(id);

      if( group.title == '實例照片'){
        throw Error('實例照片無法刪除');
      }

      const item = await Group.deleteById(id);
      const message = 'Delete success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  }
}
