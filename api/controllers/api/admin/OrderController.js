module.exports = {

  find: async (req, res) => {
    try {
      const { query } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      if (serverSidePaging) {
        const include = {
          model: OrderStatus
        };
        result = await PagingService.process({query, modelName, include});
      } else {
        const items = await sails.models[modelName].findAll({
          include: OrderStatus
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
      const item = await Order.findOne({
        where: {
          id: id
        },
        include: OrderStatus
      });
      res.ok({ data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;

      data.customField = '';
      data.paymentCompany = '';
      data.paymentAddress2 = '';
      data.paymentCountry = '';
      data.paymentCountryId = 0;
      data.paymentZone = '';
      data.paymentZoneId = 0;
      data.paymentAddressFormat = '';
      data.paymentCustomField = '';
      data.shippingCompany = '';
      data.shippingAddress2 = '';
      data.shippingCountry = '';
      data.shippingCountryId = 0;
      data.shippingZone = '';
      data.shippingZoneId = 0;
      data.shippingAddressFormat = '';
      data.shippingCustomField = '';
      data.commission = 0.0;
      data.marketingId = 0;
      data.languageId = 0;
      data.ip = '';
      data.forwardedIp = '';
      data.userAgent = '';
      data.acceptLanguage = '';

      const message = 'Create success.';
      const item = await Order.create(data);
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      data.customField = '';
      data.paymentCompany = '';
      data.paymentAddress2 = '';
      data.paymentCountry = '';
      data.paymentCountryId = 0;
      data.paymentZone = '';
      data.paymentZoneId = 0;
      data.paymentAddressFormat = '';
      data.paymentCustomField = '';
      data.shippingCompany = '';
      data.shippingAddress2 = '';
      data.shippingCountry = '';
      data.shippingCountryId = 0;
      data.shippingZone = '';
      data.shippingZoneId = 0;
      data.shippingAddressFormat = '';
      data.shippingCustomField = '';
      data.commission = 0.0;
      data.marketingId = 0;
      data.languageId = 0;
      // data.ip = '';
      // data.forwardedIp = '';
      // data.userAgent = '';
      data.acceptLanguage = '';

      const message = 'Update success.';
      const item = await Order.update(data ,{
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
      const item = await Order.destroy({ where: { id } });
      const message = 'Delete success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  confirm: async (req, res) => {
    try{
      const { id } = req.params;
      const orderStatus = await OrderStatus.findOne({where:{name: 'PROCESSING'}})
      let order = await Order.findById(id);
      order.tracking = "CONFIRM";
      order.OrderStatusId = orderStatus.id;
      await order.save();

      await OrderHistory.create({
        OrderId: order.id,
        OrderStatusId: orderStatus.id,
        comment: `User ID: ${order.UserId} ,CONFIRM Order ID: ${order.id}. Order Status: 'PROCESSING'. Order Data:${JSON.stringify(order, null, 2)}`,
      });

      const orderProducts = await OrderProduct.findAll({
        where:{
          OrderId: id
        },
        include:[ Order, Product]
      });

      let suppliers = [];
      for( let order of orderProducts){
        if(suppliers.indexOf(order.Product.SupplierId) === -1){
          suppliers.push( order.Product.SupplierId );
        }
      }

      for( let supplier of suppliers){

        let supplierShipOrder = await SupplierShipOrder.create({
          OrderId: id,
          SupplierId: supplier,
          invoiceNo: order.invoiceNo,
          invoicePrefix: order.invoicePrefix,
          firstname: order.firstname,
          lastname: order.lastname,
          email: order.email,
          telephone: order.telephone,
          fax: order.fax,
          customField: order.customField,
          paymentFirstname: order.paymentFirstname,
          paymentLastname: order.paymentLastname,
          paymentCompany: order.paymentCompany,
          paymentAddress1: order.paymentAddress1,
          paymentAddress2: order.paymentAddress2,
          paymentCity: order.paymentCity,
          paymentPostcode: order.paymentPostcode,
          paymentCountry: order.paymentCountry,
          paymentCountryId: order.paymentCountryId,
          paymentZone: order.paymentZone,
          paymentZoneId: order.paymentZoneId,
          paymentAddressFormat: order.paymentAddressFormat,
          paymentCustomField: order.paymentCustomField,
          paymentMethod: order.paymentMethod,
          paymentCode: order.paymentCode,
          shippingFirstname: order.shippingFirstname,
          shippingLastname: order.shippingLastname,
          shippingCompany: order.shippingCompany,
          shippingAddress1: order.shippingAddress1,
          shippingAddress2: order.shippingAddress2,
          shippingCity: order.shippingCity,
          shippingPostcode: order.shippingPostcode,
          shippingCountry: order.shippingCountry,
          shippingCountryId: order.shippingCountryId,
          shippingZone: order.shippingZone,
          shippingZoneId: order.shippingZoneId,
          shippingAddressFormat: order.shippingAddressFormat,
          shippingCustomField: order.shippingCustomField,
          shippingMethod: order.shippingMethod,
          shippingCode: order.shippingCode,
          comment: order.comment,
          total: order.total,
          commission: order.commission,
          tracking: order.tracking,
          ip: order.ip,
          forwardedIp: order.forwardedIp,
          userAgent: order.userAgent,
          acceptLanguage: order.acceptLanguage,
          status: 'NEW',
        });

        for( let orderProduct of orderProducts ){
          if( orderProduct.Product.SupplierId === supplier ){

            await SupplierShipOrderProduct.create({
              SupplierShipOrderId: supplierShipOrder.id,
              ProductId: orderProduct.ProductId,
              name: orderProduct.name,
              model: orderProduct.model,
              quantity: orderProduct.quantity,
              price: orderProduct.price,
              total: orderProduct.total,
              tax: orderProduct.tax,
              status: 'NEW',
            });

          }
        }
      }


      const message = 'Success Confirm Order';
      const item = order;
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },
}
