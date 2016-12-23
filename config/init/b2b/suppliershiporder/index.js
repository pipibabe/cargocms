module.exports.init = async () => {
  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {
      let order = await Order.findOne();
      let orderProduct = await OrderProduct.findById(1);
      let product = await Product.findById(orderProduct.ProductId);

      const j = [0, 1, 2];
      for(const i of j) {
        let supplierShipOrder = await SupplierShipOrder.create({
          OrderId: order.id,
          SupplierId: product.SupplierId,
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
          status: '確定訂單',
        });

        let supplierShipOrderDescription = await SupplierShipOrderDescription.create({
          SupplierShipOrderId: supplierShipOrder.id,
          OrderProductId: orderProduct.id,
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
  } catch (e) {
    console.error(e);
  }
};
