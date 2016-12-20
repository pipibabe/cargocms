module.exports = {
  product: async function(name){
    const image = await Image.create({
      filePath: `/uploads/product_${name}.jpg`,
      type: 'image/jpeg',
      storage: 'local'
    });

    const productData = {
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
      ImageId: image.id,
    };

    const product = await Product.create(productData);

    const productDescData = {
      ProductId: product.id,
      name: `Full name of ${name}`,
      description: `Description of ${name}` ,
      tag: 'meow',
      title: 'The Product Title',
      metaTitle: 'ProductMetaTitle',
      metaDescription:'ProductMetaDescription',
      metaKeyword: 'ProductMetaKeyWord',
    }
    await ProductDescription.create(productDescData);

    return product;
  },

  order: async (userId) => {
    try {
      const data = {
        UserId: userId,
        invoiceNo: '12345678',
        invoicePrefix: 'GH',
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
        firstname:'大明',
        lastname:'王',
        email:'user@example.com',
        telephone:'04 0000-0000',
        fax:'04 0000-0001',
        paymentFirstname:'',
        paymentLastname:'',
        paymentAddress1:'',
        paymentCity:'',
        paymentPostcode:'',
        paymentMethod:'',
        paymentCode:'',
        shippingFirstname:'',
        shippingLastname:'',
        shippingAddress1:'',
        shippingCity:'',
        shippingPostcode:'',
        shippingMethod:'',
        shippingCode:'',
        comment:'',
        tracking: '客戶訂購'
      }
      return await Order.create(data);
    } catch (e) {
      throw e;
    }
  },

  orderProduct: async (orderId, productId, quantity) => {
    try {
      const product = await Product.find({
        where: {
          id: productId
        },
        include: ProductDescription
      });

      let data = {
        name: product.ProductDescription.name,
        model: product.model,
        quantity: quantity,
        price: product.price,
        total: product.price * quantity,
        tax: (product.price * quantity) * 0.05,
        OrderId: orderId,
        ProductId: productId
      }

      return await OrderProduct.create(data);
    } catch (e) {
      throw e;
    }
  },

  supplier: async (name) => {
    try {
      let data = {
        name: name,
        email: 'seafood@example.com',
        telephone: '(04)-2201-1688',
        fax: '(04)-2201-1168',
        address: '台中市清水區北提路'
      };

      return await Supplier.create(data);
    } catch (e) {
      throw e;
    }
  },

  supplierProduct: async(supplierId, productId) => {
    try {

      const product = await Product.findById(productId);
      product.SupplierId = supplierId;
      await product.save();

      return product;
    } catch (e) {
      throw e;
    }
  },

  supplierShipOrder: async(orderId, supplierIdArray) => {
    try {
      let data = {
        // TODO: supplierProduct data
      }
      throw Error('尚未實作 supplier order Help')
      return await SupplierShipOrder.create(data);
    } catch (e) {
      throw e;
    }
  },

  supplierShipOrderDescription: async(supplierShipOrderId, orderProductId) => {
    try {
      let data = {
        // TODO: supplierShipOrderDescription data
      }
      throw Error('尚未實作 supplier ShipOrder Description Help');
      return await SupplierShipOrderDescription.create(data);
    } catch (e) {
      throw e;
    }
  },


}
