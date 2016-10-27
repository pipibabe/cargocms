module.exports = {

  find: async (req, res) => {
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
}
