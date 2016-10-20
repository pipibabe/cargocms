module.exports = {

  index: async function(req, res) {
    try {
      const info = req.flash('form')[0] || '';
      return res.view({ info });
    }
    catch (e) {
      res.serverError(e);
    }
  },

}
