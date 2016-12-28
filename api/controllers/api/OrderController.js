module.exports = {
  createOrder: async (req, res) => {
    try{
      let data = req.body;
      const products = data.products;

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

      const user = await User.findById(data.UserId);
      data.firstname = user.firstName;
      data.lastname  = user.lastName;

      const order = await Order.create(data);
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

      const message = 'get Order info success';
      res.ok({
        message,
        data: {
          item: order
        }
      })
    } catch(e) {
      res.serverError(e);
    }
  }
}
