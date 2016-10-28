module.exports = {
  index: async (req, res) => {
    res.ok({
      view: true,
      serverSidePaging: false,
      layout: 'admin/default/index',
      group: req.query.type
    });
  },
  create: async (req, res) => {
    res.ok({
      view: true,
      layout: 'admin/default/create',
      group: req.query.type
    });
  },
  edit: async (req, res) => {
    res.ok({
      view: true,
      layout: 'admin/default/edit',
      group: req.query.type
    });

  },
  show: async (req, res) => {
    res.ok({
      view: true,
      layout: 'admin/default/show',
      group: req.query.type
    });
  },
}
