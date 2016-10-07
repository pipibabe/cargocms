module.exports = {

  index: async function(req, res) {
    try {
      return res.view({});
    }
    catch (e) {
      res.serverError(e);
    }
  },

}
