module.exports = {
  product: async function(name){
    let data = {
      model: name,
      sku: "ABC1234",
      upc: "512345678900",
      ean: "0012345678905",
      jan: "4534567890126",
      isbn: "9788175257665",
      mpn: "XYZ876A1B2C3",
      location: "Taichung",
      quantity: 168,
      image: "",
      shipping: true,
      price: 100,
      points: 200,
      dateAvailable: "2017-01-01",
      weight: 146.4,
      length: 15.6,
      width: 2.3,
      height: 7.5,
      subtract: true,
      minimum: 1,
      sortOrder: 0,
      publish: true,
      viewed: 678,
      ImageId: null,
    };
    return await Product.create(data);
  },

  order: async (userId) => {
    try {
      const data = {
        UserId: userId,
        customField: '',
        paymentCompany: '',
        paymentAddress2: '',
        paymentCountry: '',
        paymentCountryId: 0,
        paymentZone: '',
        paymentZoneId: 0,
        paymentAddressFormat: '',
        paymentCustomField: '',
        shippingCompany: '',
        shippingAddress2: '',
        shippingCountry: '',
        shippingCountryId: 0,
        shippingZone: '',
        shippingZoneId: 0,
        shippingAddressFormat: '',
        shippingCustomField: '',
        commission: 0.0,
        marketingId: 0,
        languageId: 0,
        ip: '',
        forwardedIp: '',
        userAgent: '',
        acceptLanguage: '',
      }
      return await Order.create(data);
    } catch (e) {
      throw e;
    }
  },

  orderProduct: async (orderId, productId) => {
    try {
      let data = {
        // TODO: orderProduct data
      }
      throw Error('尚未實作 orderProduct Help')
      return await OrderProduct.create(data);
    } catch (e) {
      throw e;
    }
  },

  supplier: async (productId) => {
    try {
      let data = {
        // TODO: supplier data
      }
      throw Error('尚未實作 supplier Help')
      return await Supplier.create(data);
    } catch (e) {
      throw e;
    }
  },

  supplierProduct: async() => {
    try {
      let data = {
        // TODO: supplierProduct data
      }
      throw Error('尚未實作 supplier Product Help')
      return await SupplierProduct.create(data);
    } catch (e) {
      throw e;
    }
  }
}
