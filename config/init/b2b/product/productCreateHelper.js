module.exports = {
  create: async function(name , supplierName, categoryType, categoryEng){
    const image = await Image.create({
      filePath: `/uploads/product_${name}.jpg`,
      type: 'image/jpeg',
      storage: 'local'
    });

    const supplier = await Supplier.create({
      name: `${supplierName}`,
      email: '168_seafood@gmail.com',
      telephone: '(04)-2201-1688',
      fax: '(04)-2201-1168',
      address: '台中市清水區北提路'
    });

    let productData = {
      model: name,
      sku: "ABC1234",
      upc: "512345678900",
      ean: "0012345678905",
      jan: "4534567890126",
      isbn: "9788175257665",
      mpn: "XYZ876A1B2C3",
      location: "台中市清水區",
      quantity: 200,
      image: `catalog/demo/168_seafood_${categoryEng}.jpg`,
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

    let product = await Product.create(productData);

    let productDescription = await ProductDescription.create({
        name: `${name}`,
        description: `${name}`,
        tag: `${categoryType}`,
        metaTitle: `${categoryType}`,
        metaDescription: `${categoryType}`,
        metaKeyword: `${categoryType}, ${categoryEng}`,
        ProductId: product.id
      });

    let productTag = await ProductTag.create({
      tag: `${categoryType}`,
      ProductId: product.id
    });

    let productImage = await ProductImage.create({
      ProductId: product.id,
      ImageId: image.id,
      image: `catalog/demo/168_seafood_${categoryEng}.jpg`,
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

    await product.setCategories(initCategory);


    productData.model = `${name} 超二代`;
    product = await Product.create(productData);
    await product.setCategories(initCategory);

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

    productImage = await ProductImage.create({
      ProductId: product.id,
      ImageId: image.id,
      image: `catalog/demo/168_seafood_${categoryEng}.jpg`,
      sortOrder: 0
    });

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

    return product;
  },
}
