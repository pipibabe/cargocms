module.exports = {

  index: async function(req, res) {
    try {
      const productGroups = Group.findWithType('product');
      return res.view({productGroups});
    }
    catch (e) {
      res.serverError(e);
    }
  },

}
