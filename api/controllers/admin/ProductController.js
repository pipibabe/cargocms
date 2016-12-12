module.exports = {
  index: async (req, res) => {
    res.ok({
      view: true,
      serverSidePaging: true,
      layout: 'admin/default/index'
    });
  },
}
