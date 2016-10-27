module.exports = {
  index: async (req, res) => {
    res.ok({
      view: true,
      serverSidePaging: false,
      layout: 'admin/default/index'
    });
  },
  create: async (req, res) => {
    res.ok({
      view: true,
      layout: 'admin/default/create'
    });
  },
  edit: async (req, res) => {
    res.ok({
      view: true,
      layout: 'admin/default/edit'
    });

  },
  show: async (req, res) => {
    res.ok({
      view: true,
      layout: 'admin/default/show'
    });
  },
}
