module.exports.init = async () => {
  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {
      let image = await Image.create({
        filePath: 'http://www.labfnp.com/modules/core/img/update1.jpg',
        type: 'image/jpeg',
        storage: 'url',
      });

      let product = await Product.create({
          model: "Product 1",
          sku: "ABC1234",
          upc: "512345678900",
          ean: "0012345678905",
          jan: "4534567890126",
          isbn: "9788175257665",
          mpn: "XYZ876A1B2C3",
          location: "Test location",
          quantity: 939,
          image: "catalog/demo/htc_touch_hd_1.jpg",
          shipping: true,
          price: 100,
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
        });

      let productDescription = await ProductDescription.create({
          name: "HTC Touch HD",
          description: "Happy Telephone Company",
          tag: "HTC",
          metaTitle: "HTC Touch HD",
          metaDescription: "HTC Touch HD",
          metaKeyword: "HTC Touch",
          ProductId: product.id
        });

      let productTag = await ProductTag.create({
        tag: "Product Tag Test",
        ProductId: product.id
      });

      let productImage = await ProductImage.create({
        ProductId: product.id,
        ImageId: image.id,
        image: "catalog/demo/macbook_pro_3.jpg",
        sortOrder: 0
      });

      let option = await Option.create({
        type: 'textarea',
        sortOrder: 5,
      });

      let optionValue = await OptionValue.create({
        image:"test/option_image.jpg",
        sortOrder: 4,
        OptionId: option.id
      });

      let productOption = await ProductOption.create({
        value: 'product option test',
        required: true,
        OptionId: option.id,
        ProductId: product.id
      });

      let productOptionValue = await ProductOptionValue.create({
        quantity: 100,
        subtract: true,
        price: 100,
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
        image: "catalog/demo/macbook_pro_1.jpg",
        top: 1,
        column: 2,
        sortOrder: 1,
        status: 1,
      });

      const initCategory2 = await Category.create({
        image: "catalog/demo/macbook_pro_2.jpg",
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
