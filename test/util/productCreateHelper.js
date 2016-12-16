module.exports = {
  create: async function(name){
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
}
