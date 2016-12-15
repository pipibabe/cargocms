module.exports = {
  createOrder: async (req, res) => {
    try{
      let data = req.body;
      const products = data.products;
      const orderUser = data.user;
      
      // data remove products
      delete data.products;
      //ignore columns
      data.customField = '',
      data.paymentCompany = '',
      data.paymentAddress2 = '',
      data.paymentCountry = '',
      data.paymentCountryId = 0,
      data.paymentZone = '',
      data.paymentZoneId = 0,
      data.paymentAddressFormat = '',
      data.paymentCustomField = '',
      data.shippingCompany = '',
      data.shippingAddress2 = '',
      data.shippingCountry = '',
      data.shippingCountryId = 0,
      data.shippingZone = '',
      data.shippingZoneId = 0,
      data.shippingAddressFormat = '',
      data.shippingCustomField = '',
      data.commission = 0.0000,
      data.marketingId = 0,
      data.languageId = 0,
      data.acceptLanguage = '',

      const order = await Order.create();

    } catch (e) {
      res.serverError(e);
    }
  }
}
