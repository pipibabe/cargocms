

module.exports = {
  index: async (req, res) => {
    let feed = sails.config.feed;
    try {
      res.view('wall/index', {
        feed
      });
    } catch (e) {
      res.serverError(e);
    }
  },
}
