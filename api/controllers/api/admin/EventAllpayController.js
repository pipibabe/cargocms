import moment from 'moment';

module.exports = {

  find: async (req, res) => {
    try {
      const { serverSidePaging } = req.query;
      const query = req.body;
      const modelName = 'allpay'
      let result;
      if (serverSidePaging) {
        const include = {
          model: EventOrder,
          include: [
            User,
            {
              model: Event,
              // include: [ Post ]
            }
          ]
        }
        result = await PagingService.process({ query, modelName, include });
      } else {
        const items = await sails.models[modelName].findAll({
          include:{
            model: EventOrder,
            include: [User, Event]
          }
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
      const item = await Allpay.findOne({
        where:{
          id
        },
        include:[ {
          model: EventOrder,
          include: [
            User,
            {
              model: Event,
              // include: [ Post ]
            }
          ]
        } ]
       });
      res.ok({ data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const message = 'Update success.';
      //只更新  EventOrder 資料

      const eventData = {
        recipient: data.Recipient,
        address: data.Address,
        phone: data.Phone,
        email: data.Email,
        note: data.Note,
        remark: data.Remark,
        productionStatus: data.EventOrder.productionStatus
      };

      const order = await EventOrder.update(eventData, {
        where: { id: data.EventOrderId, },
      });

      res.ok({ message, data: { order } });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const eventOrder = await Allpay.findOne({
        where:{
          id
        },
        include:{
          model: EventOrder,
          include: [User, Event]
        }
       });

      const allpay = await Allpay.deleteById(id);
      const order = await EventOrder.deleteById(eventOrder.EventOrderId);

      const message = 'Delete success.';
      res.ok({ message, data: { allpay, order } });
    } catch (e) {
      res.serverError(e);
    }
  },
  exportExcel: async (req, res) => {
    try {
      let { query, options } = req;
      sails.log.info('export', query);
      const modelName = 'allpay';
      const include = {
        model: EventOrder,
        include: [User, Event]
      }
      const content = await ExportService.query({ query, modelName, include });
      const columns = [
        { caption: '付款帳號', type: 'string' },
        { caption: '訂購票券', type: 'string' },
        { caption: '訂購人', type: 'string' },
        { caption: '參加者', type: 'string' },
        { caption: '備註', type: 'string' },
        { caption: '電話', type: 'string' },
        { caption: '住址', type: 'string' },
        { caption: '訂單狀態', type: 'string' },
        { caption: '交易訊息', type: 'string' },
        { caption: '訂單建立時間', type: 'string' },
      ];
      const format = (items) => {
        let result = [];
        for (let data of items) {
          if (data.PaymentType === 'aio') continue;
          let formatted = [
            `${data.vAccount || ''}`, //付款帳號
            data.ItemNameArray,          //訂購票券
            data.UserName,               //訂購人
            data.EventOrder.recipient,  //參加者
            data.Note,                  //備註
          ];
          formatted.push(
            `${data.Phone || ''}`,  //電話
            data.Address,              //住址
            data.EventOrder.productionStatusDesc,  //訂單狀態
            data.RtnMsg,              //交易訊息
            moment(new Date(data.createdAt)).format("YYYY/MM/DD HH:mm"), //訂單建立時間
          );

          result.push(formatted);
        };
        return result;
      }

      const result = await ExportService.exportExcel({
        fileName: '完整資訊表',
        content,
        format,
        columns,
      });
      res.attachment(result.fileName);
      res.end(result.data, 'UTF-8');
    } catch (e) {
      res.serverError(e);
    }
  },

  exportSignExcel: async (req, res) => {
    try {
      let { query, options } = req;
      sails.log.info('exportSend', query);
      const modelName = 'allpay';
      const include = {
        model: EventOrder,
        include: [User, Event]
      }
      const content = await ExportService.query({ query, modelName, include });
      const columns = [
        { caption: "check", type: "string"},
        { caption: "訂購票券", type: "string"},
        { caption: "訂購人", type: "string"},
        { caption: "參加者", type: "string"},
        { caption: "備註", type: "string"},
        { caption: "Email", type: "string"},
        { caption: "電話", type: "string"},
      ]
      const format = (items) => {
        let result = [];
        for (let data of items) {
          if (data.PaymentType === 'aio') continue;
          let formatted = [
            '',
            data.ItemNameArray,
            data.UserName,
            data.EventOrder.recipient,
            data.Note,
            data.Email,
            `${data.Phone || ''}`,
          ]

          result.push(formatted);
        };
        return result;
      }

      const result = await ExportService.exportExcel({
        fileName: '簽到資訊表',
        content,
        format,
        columns,
      });
      res.attachment(result.fileName);
      res.end(result.data, 'UTF-8');
    } catch (e) {
      res.serverError(e);
    }
  },
}
