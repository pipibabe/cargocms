module.exports = {
  create: async function({name , supplierName, categoryType, categoryEng}){

    const initCategory = await Category.create({
      image: `catalog/demo/168_seafood_${categoryEng}.jpg`,
      top: 1,
      column: 2,
      sortOrder: 1,
      status: 1,
    });

    const initCategoryDesc = await CategoryDescription.create({
      name: `${categoryType}專區`,
      description: `各種${categoryType}海鮮產品`,
      metaTitle: `${categoryType}`,
      metaDescription: `${categoryType}`,
      metaKeyword: `${categoryType}, ${categoryEng}`,
      CategoryId: initCategory.id
    });

    const supplier = await Supplier.create({
      name: `${supplierName}`,
      email: '168_seafood@gmail.com',
      telephone: '(04)-2201-1688',
      fax: '(04)-2201-1168',
      address: '台中市清水區北提路'
    });

    const numberOfProduct = 10;
    let productData, product, productDescription, productTag,
        productImage, option, optionValue, productOption,
        productOptionValue, optionDescription, optionValueDescription;

    for(let i = 1; i <= numberOfProduct; i++){
      let imageNo = Math.floor(Math.random() * 800 ) + 1;
      let image = await Image.create({
        filePath: `https://unsplash.it/400/320/?image=${ imageNo }`,
        type: 'image/jpeg',
        storage: 'url'
      });

      productData = {
        model: `${name} ${i}`,
        sku: "ABC1234",
        upc: "512345678900",
        ean: "0012345678905",
        jan: "4534567890126",
        isbn: "9788175257665",
        mpn: "XYZ876A1B2C3",
        location: "台中市清水區",
        quantity: 200,
        image: image.url,
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
      };

      product = await Product.create(productData);

      productDescription = await ProductDescription.create({
          name: `${name}`,
          description: `${name}`,
          tag: `${categoryType}`,
          metaTitle: `${categoryType}`,
          metaDescription: `${categoryType}`,
          metaKeyword: `${categoryType}, ${categoryEng}`,
          ProductId: product.id
        });

      productTag = await ProductTag.create({
        tag: `${categoryType}`,
        ProductId: product.id
      });

      // 每個 Product 建立 3 張 ProductImage
      for(let i = 0; i < 3; i++){
        imageNo += i;
        let image = await Image.create({
          filePath: `https://unsplash.it/400/320/?image=${ imageNo }`,
          type: 'image/jpeg',
          storage: 'url'
        });

        productImage = await ProductImage.create({
          ProductId: product.id,
          ImageId: image.id,
          image: image.url,
          sortOrder: i + 1
        });

      }



      option = await Option.create({
        type: 'textarea',
        sortOrder: 5,
      });

      optionValue = await OptionValue.create({
        image:"catalog/option/option_image.jpg",
        sortOrder: 4,
        OptionId: option.id
      });

      productOption = await ProductOption.create({
        value: '超低溫冷藏',
        required: true,
        OptionId: option.id,
        ProductId: product.id
      });

      productOptionValue = await ProductOptionValue.create({
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

      optionDescription = await OptionDescription.create({
        name: 'textarea',
        OptionId: option.id
      });

      optionValueDescription = await OptionValueDescription.create({
        name: 'Large',
        OptionId: option.id,
        OptionValueId: optionValue.id
      });

      await product.setCategories(initCategory);
    }

    return product;
  },
}
