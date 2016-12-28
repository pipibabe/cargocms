module.exports = {

  find: async (req, res) => {
      try {
        let {query} = req
        let {serverSidePaging} = query

        if(serverSidePaging){

          const findQuery = FormatService.getQueryObj(query);
          let result = await Feeling.findAndCountAll(findQuery)
          let data = result.rows
          let recordsTotal = data.length
          let recordsFiltered =  result.count
          let draw = parseInt(req.draw) + 1

          let user = AuthService.getSessionUser(req);
          if (user) {
            let scentFeedback = await ScentFeedback.findAll({
              where: {
                UserId: user.id,
              },
              include: {
                model: Scent,
                where: {
                  name: query.search.value,
                }
              }
            });
            data = data.map((info) => info.toJSON());
            scentFeedback = scentFeedback.map((info) => {
              info = info.toJSON();
              return {
                ...info,
                title: info.feeling
              }
            });
            data = scentFeedback.concat(data);
          }

          res.ok({draw, recordsTotal, recordsFiltered, data});
        }else {
          const feelings = await Feeling.findAll();
          res.ok({
            data: {
              items: feelings
          }});
        }
      } catch (e) {
        res.serverError({ message: e, data: {}});
      }
    },

  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Feeling.findById(id)
      res.ok({data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      let sameFeeling = await Feeling.findOne({
        where:{
          title: data.title,
          scentName: data.scentName
        }
      });

      if(sameFeeling){
        throw new Error('Can not create same feeling with same scentName.');
      } else {
        const item = await FeelingService.create(data);

        let message = 'Create success.';
        res.ok({ message, data: { item } } );
      }

    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const item = await FeelingService.update(id, data);

      const message = 'Update success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      // const item = await Feeling.deleteById(id);
      const item = await FeelingService.destroy(id);
      let message = 'Delete success';
      res.ok({message, data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  },

  exportFeeling: async (req, res) => {
    try {
      let { options, body } = req;
      let query = body;
      sails.log.info('export', query);
      const modelName = options.controller.split("/").reverse()[0];
      const content = await ExportService.query({ query, modelName });

      const columns = [
        { caption: "感覺", type: "string"},
        { caption: "香味分子", type: "string"},
        { caption: "Total Repeat", type: "string"},
        { caption: "Score", type: "string"}
      ]

      const format = (items) => {
        let result = [];
        for (let data of items) {
          let formatted = [
            data.title,
            data.scentName,
            data.totalRepeat,
            data.score
          ]

          result.push(formatted);
        };
        return result;
      }

      const result = await ExportService.exportExcel({
        fileName: `感覺 Feeling 資料`,
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
