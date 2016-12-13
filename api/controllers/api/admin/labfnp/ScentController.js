module.exports = {
  find: async function(req, res) {
    try {
      sails.log.info("=== enter index ===");
      let data = await Scent.findAllWithRelationFormatForApp();
      return res.ok({
        data: {
          items: data,
        },
      });
    } catch (e) {
      res.serverError(e);
    }
  },
}
