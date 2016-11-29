module.exports = {
  index: async (req, res) => {
    try {

      let feeds = await Feed.findAll({
        where: {
          publish: true
        },
        order: [['createdAt', 'DESC']],
      });

      let quotes = await Quote.findAll({
        where:{
          type: 'quote'
        },
        limit: 5,
        order: [['createdAt', 'DESC']],
        include:{
          model: Image
        }
      })

      if (req.wantsJSON) {
        return res.json(feeds);
      }
      else {
        res.view({
          feeds,
          quotes
        });
      }
    } catch (e) {
      res.serverError(e);
    }
  },
  show: async (req, res) => {
    try {

      let feed = await Feed.findOne({
        where: {
          sourceId: req.params.id,
        },
      });

      if (!feed) {
        return res.notFound();
      }

      if (req.wantsJSON) {
        return res.json(feed);
      }
      else {
        res.view({
          feed
        });
      }
    }
    catch (e) {
      res.serverError(e);
    }
  },
};
