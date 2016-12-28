module.exports = {
  createOrder: async (req, res) => {
    try{
      let data = req.body;
      const products = data.products;
      const loginUser = AuthService.getSessionUser(req);

      // data remove products
      delete data.products;
      //ignore columns
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
      data.commission = 0.0000;
      data.marketingId = 0;
      data.languageId = 0;
      data.acceptLanguage = '';

      const user = await User.findById(loginUser.id);
      data.firstname = user.firstName;
      data.lastname  = user.lastName;

      const orderPaymentStatus = await OrderPaymentStatus.findOne({where: {name: 'NEW'}});

      const orderPayment = await OrderPayment.create({
        paymentFirstname: data.paymentFirstname,
        paymentLastname: data.paymentLastname,
        paymentCompany: data.paymentCompany,
        paymentAddress1: data.paymentAddress1,
        paymentAddress2: data.paymentAddress2,
        paymentCity: data.paymentCity,
        paymentPostcode: data.paymentPostcode,
        paymentCountry: data.paymentCountry,
        paymentCountryId: data.paymentCountryId,
        paymentZone: data.paymentZone,
        paymentZoneId: data.paymentZoneId,
        paymentAddressFormat: data.paymentAddressFormat,
        paymentCustomField: data.paymentCustomField,
        paymentMethod: data.paymentMethod,
        paymentCode: data.paymentCode,
        OrderPaymentStatusId: orderPaymentStatus.id
      });

      await OrderPaymentHistory.create({
        status: orderPaymentStatus.name,
        comment: 'create new Order',
        notify: true,
        OrderPaymentId: orderPayment.id,
        OrderPaymentStatusId: orderPaymentStatus.id
      });

      const order = await Order.create({
        ...data,
        OrderPaymentId: orderPayment.id
      });
      sails.log.info("new Order Create", order);

      for(let p of products){
        let product = await Product.find({
          where: {
            id: p.id,
          },
          include: ProductDescription
        });
        await OrderProduct.create({
          ProductId: product.id,
          OrderId: order.id,
          name: product.ProductDescription.name,
          model: product.model,
          quantity: p.quantity,
          price: product.price,
          total: (product.price * p.quantity),
          tax: (product.price * p.quantity) * 0.05,
          // reward: 0
        });
      }
      const message = 'Order create success';
      res.ok({
        message: message,
        data: {
          item: order
        }
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  getOrderInfo: async (req, res) => {
    try{
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      const orderProduct = await OrderProduct.findAll({
        where: {
          OrderId: order.id
        }
      })
      const message = 'get Order info success';
      res.ok({
        message,
        data: {
          item: order,
          product: orderProduct
        }
      })
    } catch(e) {
      res.serverError(e);
    }
  }
}
