module.exports = {

  find: async (req, res) => {
    try {
      const { query, method, body } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      const include = [  ];
      const isPost = method === 'POST';
      let mServerSidePaging = isPost ? body.serverSidePaging : serverSidePaging;
      let mQuery = isPost ? body : query;
      let result;
      if (mServerSidePaging) {
        result = await PagingService.process({ query: mQuery, modelName, include });
      } else {
        const items = await sails.models[modelName].findAll({
          include
        });
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
      const item = await SupplierShipOrderHistory.findOne({
        where:{
          id
        },
        include: []
      });
      res.ok({data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      let data = req.body;
      const item = await SupplierShipOrderHistory.create(data);
      let message = 'Create success.';
      res.ok({ message, data: { item } } );
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const message = 'Update success.';
      const item = await SupplierShipOrderHistory.update(data ,{
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
      const item = await SupplierShipOrderHistory.destroy({ where: { id } });
      let message = 'Delete success';
      res.ok({message, data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  }
}
