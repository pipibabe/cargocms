module.exports.init = async () => {
  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {

      const image = await Image.create({
        filePath: 'uploads/product_image_1.jpg',
        type: 'image/jpeg',
        storage: 'local',
      });

      const supplier = await Supplier.create({
        name: '壹陸捌活海產',
        email: '168_seafood@gmail.com',
        telephone: '(04)-2201-1688',
        fax: '(04)-2201-1168',
        address: '台中市清水區北提路'
      });

      let product = await Product.create({
          model: "鮮甜飽滿無毒益菌蝦",
          sku: "ABC1234",
          upc: "512345678900",
          ean: "0012345678905",
          jan: "4534567890126",
          isbn: "9788175257665",
          mpn: "XYZ876A1B2C3",
          location: "台中市清水區",
          quantity: 200,
          image: "catalog/demo/168_seafood_Shrimp.jpg",
          shipping: true,
          price: 599,
          points: 200,
          dateAvailable: "2017-01-01",
          weight: 146.4,
          length: 10,
          width: 10,
          height: 10,
          subtract: true,
          minimum: 1,
          sortOrder: 0,
          publish: true,
          viewed: 12321,
          ImageId: image.id,
          SupplierId:  supplier.id,
        });

      let productDescription = await ProductDescription.create({
          name: "鮮甜飽滿無毒益菌蝦",
          description: "鮮甜飽滿無毒益菌蝦",
          tag: "蝦",
          metaTitle: "鮮甜飽滿無毒益菌蝦",
          metaDescription: "H鮮甜飽滿無毒益菌蝦",
          metaKeyword: "鮮甜飽滿無毒益菌蝦",
          ProductId: product.id
        });

      let productTag = await ProductTag.create({
        tag: "蝦",
        ProductId: product.id
      });

      let productImage = await ProductImage.create({
        ProductId: product.id,
        ImageId: image.id,
        image: "catalog/demo/168_seafood_Shrimp.jpg",
        sortOrder: 0
      });

      let option = await Option.create({
        type: 'textarea',
        sortOrder: 5,
      });

      let optionValue = await OptionValue.create({
        image:"catalog/option/option_image.jpg",
        sortOrder: 4,
        OptionId: option.id
      });

      let productOption = await ProductOption.create({
        value: '超低溫冷藏',
        required: true,
        OptionId: option.id,
        ProductId: product.id
      });

      let productOptionValue = await ProductOptionValue.create({
        quantity: 100,
        subtract: true,
        price: 150,
        pricePrefix: "+",
        points: 0,
        pointsPrefix: "+",
        weight: 1.00000,
        weightPrefix: "+",
        OptionId: option.id,
        OptionValueId: optionValue.id,
        ProductId: product.id,
        ProductOptionId: productOption.id
      });

      let optionDescription = await OptionDescription.create({
        name: 'textarea',
        OptionId: option.id
      });

      let optionValueDescription = await OptionValueDescription.create({
        name: 'Large',
        OptionId: option.id,
        OptionValueId: optionValue.id
      });

      const initCategory1 = await Category.create({
        image: "catalog/demo/168_seafood_Shrimp1.jpg",
        top: 1,
        column: 2,
        sortOrder: 1,
        status: 1,
      });

      const initCategory2 = await Category.create({
        image: "catalog/demo/168_seafood_Shrimp2.jpg",
        ParentId: initCategory1.id,
        top: 2,
        column: 2,
        sortOrder: 2,
        status: 1,
      });

      const initCategoryDesc1 = await CategoryDescription.create({
        name: 'Category1',
        description: 'test desc 1',
        metaTitle: 'meta title 1',
        metaDescription: 'meta desc 1',
        metaKeyword: 'meta,keyword,test,1',
        CategoryId: initCategory1.id
      });

      const initCategoryDesc2 = await CategoryDescription.create({
        name: 'Category2',
        description: 'test desc 2',
        metaTitle: 'meta title 2',
        metaDescription: 'meta desc 2',
        metaKeyword: 'meta,keyword,test,2',
        CategoryId: initCategory2.id
      });

      await product.setCategories(initCategory1);
    }

  } catch (e) {
    console.error(e);
  }
};
