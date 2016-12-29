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

  supplierShipOrder: async(orderId, supplierId) => {
    try {
      let order = await Order.findById(orderId);
      order = order.toJSON();
      let data = {
        ...order,
        OrderId: orderId,
        SupplierId: supplierId,
        status: 'NEW',
      }
      console.log(data);
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      return await SupplierShipOrder.create(data);
    } catch (e) {
      throw e;
    }
  },

  supplierShipOrderDescription: async(supplierShipOrderId, orderProductId, status) => {
    try {
      let orderProduct = await OrderProduct.findById(orderProductId);
      orderProduct = orderProduct.toJSON();
      let data = {
        ...orderProduct,
        SupplierShipOrderId: supplierShipOrderId,
        OrderProductId: orderProductId,
        status: status || 'NEW',
      }
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      return await SupplierShipOrderDescription.create(data);
    } catch (e) {
      throw e;
    }
  },

  orderStatus: async( status ) => {
    try{
      const orderStatus = await OrderStatus.create({
        languageId: 0,
        name: status
      })
      return orderStatus;
    } catch (e) {
      throw e;
    }
  },

  supplierCategory: async( categoryName ) => {
    try{
      const category = await Category.create({
        top: 1,
        column: 1,
        sortOrder: 1,
        status: true,
      });

      const categoryDesc = await CategoryDescription.create({
        CategoryId: category.id,
        name: categoryName,
        description: `${categoryName} Description`,
        metaTitle: `${categoryName}`,
        metaKeyword: `${categoryName}`,
        metaDescription: `${categoryName}`
      });

      return category;
    } catch (e) {
      throw e;
    }

  },

  supplierProductCategory: async ( categoryId ,productId ) => {
    try{
      const product = await Product.findById( productId );
      const category = await Category.findById( categoryId );
      await product.setCategories(category);
    } catch (e) {
      throw e;
    }
  },

  multipleOrder: async( orderProduct, orderStatsId) => {
    try{
      const order = await Order.create({
        invoiceNo: '99881234',
        invoicePrefix: 'JK',
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
        firstname:'土豪',
        lastname:'金',
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
      });

      for( let p of orderProduct ) {
        let product = await Product.findById( p ,{ include:[ ProductDescription ]})
        await OrderProduct.create({
          name: product.ProductDescription.name,
          model: product.model,
          quantity: 8,
          price: product.price,
          total: product.price * 8,
          tax: (product.price * 8 ) * 0.05
        });
      }

    } catch (e) {
      throw e;
    }
  }
}
