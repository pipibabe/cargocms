import crypto from 'crypto';
import moment from 'moment';

module.exports = {
  paid: async (req, res) => {
    try {
      const data = req.body;
      sails.log.info(data);
      const allpay = await AllpayService.paid(data);

      //  create and send message
      let messageConfig = {};
      messageConfig.serialNumber = allpay.TradeNo;
      if (allpay.EventOrderId) {
        const eventOrder = await EventOrder.findOne({
          where: allpay.EventOrderId,
          include: [User, Event]
        });
        if (parseInt(allpay.RtnCode, 10) === 1) {
          eventOrder.productionStatus = 'PAID';

          let event = await Event.findById(eventOrder.EventId);
          event.signupCount = Number(event.signupCount) + 1;
          await event.save();
        }
        await eventOrder.save();
        messageConfig.email = eventOrder.email;
        messageConfig.username = eventOrder.User.displayName;
      }
      sails.log.debug(messageConfig);
      messageConfig = await MessageService.eventPaymentConfirm(messageConfig);
      const message = await Message.create(messageConfig);
      await MessageService.sendMail(message);

      res.send('1|OK');
    } catch (e) {
      res.serverError(e);
    }
  },

  paymentinfo: async(req, res) => {
    try {
      const data = req.body;
      sails.log.info(data);
      const allpay = await AllpayService.paymentinfo(data);

      let messageConfig = {};
      messageConfig.serialNumber = allpay.TradeNo;
      messageConfig.paymentTotalAmount = allpay.ShouldTradeAmt;
      messageConfig.bankName = sails.__({
        phrase: allpay.PaymentType,
        locale: 'zh'
      });
      messageConfig.bankId = allpay.BankCode;
      messageConfig.accountId = allpay.vAccount;
      messageConfig.expireDate = allpay.ExpireDate;
      if (allpay.EventOrderId) {
        const eventOrder = await EventOrder.findOne({
          where: allpay.EventOrderId,
          include: [User, Event]
        });
        messageConfig.productName = eventOrder.Event.title + ' 1 張';
        messageConfig.email = eventOrder.email;
        messageConfig.username = eventOrder.User.displayName;
        messageConfig.shipmentUsername = eventOrder.recipient;
        messageConfig.shipmentAddress = eventOrder.address;
        messageConfig.note = eventOrder.note;
        messageConfig.phone = eventOrder.phone;
      }
      sails.log.debug(messageConfig);
      messageConfig = await MessageService.eventOrderConfirm(messageConfig);
      const message = await Message.create(messageConfig);
      await MessageService.sendMail(message);

      res.send('1|OK');
    } catch (e) {
      res.serverError(e);
    }
  },

  export: async (req, res) => {
    try {
      let { query, options } = req;
      sails.log.info('export', query);
      const modelName = options.controller.split("/").reverse()[0];
      const content = await ExportService.query({ query, modelName });
      const columns = {}
      const format = (items) => {
        return items;
      }

      const result = await ExportService.export({
        fileName: modelName,
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

  find: async (req, res) => {
    try {
      const { query } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      if (serverSidePaging) {
        result = await PagingService.process({query, modelName});
      } else {
        const items = await sails.models[modelName].findAll();
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
      const item = await Event.findById(id);
      res.ok({ data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },
  findNewEvent: async (req, res) => {
    try {
      res.ok({
        message: 'find event success.',
        data: {
          items: await Event.findAll({ where: { PostId: null }}),
        }
      });
    } catch (e) {
      res.serverError(e);
    }
  },
  findByPostOrNew: async (req, res) => {
    try {
      const { id } = req.params;
      res.ok({
        message: 'find event success.',
        data: {
          items: await Event.findAll({ where: { PostId: { $or: [null, id] }}}),
        }
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      const item = await Event.create(data);
      const message = 'Create success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      let data = req.body;
      if(!data.PostId) delete data.PostId;
      const message = 'Update success.';
      const item = await Event.update(data ,{
        where: { id, },
      });
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Event.deleteById(id);
      const message = 'Delete success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  }
}
