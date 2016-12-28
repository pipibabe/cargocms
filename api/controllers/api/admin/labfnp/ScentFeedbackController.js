module.exports = {

  find: async (req, res) => {
    try {
      const { query } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      if (serverSidePaging) {
        const include = [Scent, User];
        result = await PagingService.process({query, modelName, include});
      } else {
        const items = await sails.models[modelName].findAll({
          include:[Scent, User]
        });
        result = { data: { items } };
      }
      res.ok(result);
    } catch (e) {
      res.serverError(e);
    }
  },

  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await ScentFeedback.findOne({
        where:{
          id
        },
        include:[Scent, User]
       });
      res.ok({ data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await ScentFeedback.deleteById(id);
      const message = 'Delete success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  feedbackCheck: async (req, res) => {
    try{
      const { id } = req.params;
      const data = req.body;

      await ScentService.scentUpdatebyFeedback(data);
      const item = await ScentFeedback.update({ feedbackCheck: true },{
        where: { id }
      });
      const message = 'Feedback Checked.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  exportFeedback: async (req, res) => {
    try {
      let { options, body } = req;
      let query = body;
      sails.log.info('export Secnt Feedback', query);
      const modelName = options.controller.split("/").reverse()[0];
      const include = [Scent, User];
      const content = await ExportService.query({ query, modelName, include });

      const columns = [
        { caption: "香調", type: "string"},
        { caption: "回饋內容", type: "string"},
        { caption: "會員", type: "string"},
        { caption: "回饋時間", type: "string"},
        { caption: "已確認", type: "string"},

      ]

      const format = (items) => {
        let result = [];
        for (let data of items) {
          let formatted = [
            data.scentName,
            data.feeling,
            data.userName,
            data.createdDateTime.dateTime,
            data.feedbackCheck ? 'Yes':'No'
          ]

          result.push(formatted);
        };
        return result;
      }

      const result = await ExportService.exportExcel({
        fileName: `香調回饋資料`,
        content,
        format,
        columns,
      });
      res.ok({
        message: 'Get Excel export success.',
        data: result.fileName,
      })
    } catch (e) {
      res.serverError(e);
    }
  },
}
