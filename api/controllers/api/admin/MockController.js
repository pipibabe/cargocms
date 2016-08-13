import MockData from 'mockup-data';

module.exports = {

  find: async (req, res) => {
    console.log("=== mock find ===");
    try {
      let params = sails.config.mock.config;
      let {count, title} = sails.config.mock;
      let mockData = new MockData({params, count});
      mockData.processRandamData();
      let items = mockData.getData();
      let {cols} = params

      res.ok({view: true, data: {items, cols, title}});

    } catch (e) {

      res.serverError(e);

    }
  }
}
