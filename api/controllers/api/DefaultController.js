module.exports = {

  find: async (req, res) => {
    try {
      const itmes = await Model.findAll();
      res.ok({data: {itmes}});
    } catch (e) {
      res.serverError(e);
    }
  },
  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Model.findOne({id})
      res.ok({data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      const item = await Model.create(data);
      let message = 'Create success.';
      res.ok({message, data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      let message = 'Update success.'
      let params = {id, ...data}
      const item = await Model.update(params);
      res.ok({message, data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Model.deleteById(id);
      let message = 'Delete success';
      res.ok({message, data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  }
}
