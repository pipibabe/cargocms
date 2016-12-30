module.exports = {
  createOrder: async ( data ) => {
    try{
      const products = JSON.parse(data.products);

      data.tracking = '訂單建立';
      data.shippingCode = '';
      data.comment = '';
      data.fax = '';

      data.shippingLastname = data.shippingLastname || data.lastname;
      data.shippingFirstname= data.shippingFirstname || data.firstname;

      // data remove products
      delete data.products;
      //ignore columns
      data.invoiceNo = '',        // 付款才建立資料
      data.invoicePrefix = '',
      data.paymentFirstname = '',
      data.paymentLastname = '',
      data.paymentAddress1 = '',
      data.paymentCity = '',
      data.paymentPostcode = '',
      data.paymentMethod = '',
      data.paymentCode = '',  // 付款資料 -end-

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

      if (data.telephone ==! data.shippingTelephone) {
        data.telephone = data.shippingTelephone;
      }

      if (data.email ==! data.shippingEmail) {
        data.email = data.shippingEmail;
      }

      const orderStatus = await OrderStatus.findOne({
        where: { name:'NEW' }
      });
      data.OrderStatusId = orderStatus.id;

      console.log("=== create data =>",data);
      console.log("=== make order");
      const order = await Order.create(data);

      sails.log.info("new Order Create", order);

      let orderProduct = [];
      for(let p of products){
        let product = await Product.find({
          where: {
            id: p.id,
          },
          include: ProductDescription
        });
        orderProduct.push(
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
          })
        );
      }
      sails.log.info("new OrderProduct Create", orderProduct);

      return { order, orderProduct };

    } catch (e) {
      res.serverError(e);
    }
  },
}
