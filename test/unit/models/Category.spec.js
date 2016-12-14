describe('about Category & CategoryDescription & Prodct model operations.', function() {
  const categoryData1 = {
    image: "catalog/demo/macbook_pro_1.jpg",
    top: 1,
    column: 2,
    sortOrder: 1,
    status: 1,
  };
  const categoryData2 = {
    image: "catalog/demo/macbook_pro_2.jpg",
    top: 2,
    column: 2,
    sortOrder: 2,
    status: 1,
  };
  const categorydesc = {
    name: 'categoryData1',
    description: 'test desc 1',
    metaTitle: 'meta title 1',
    metaDescription: 'meta desc 1',
    metaKeyword: 'meta,keyword,test,1',
  };
  let product;

  before(async (done) => {
    try {
      let image = await Image.create({
        filePath: 'http://www.labfnp.com/modules/core/img/update1.jpg',
        type: 'image/jpeg',
        storage: 'url',
      });
      product = await Product.create({
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
      done();
    } catch (e) {
      done(e);
    }
  });

  it('create Category and set CategoryDescription should success.', async (done) => {
    try {
      const c1 = await Category.create(categoryData1);
      const c2 = await Category.create(categoryData2);
      const newCategorydesc = categorydesc;
      newCategorydesc.CategoryId = c1.id;
      const cD1 = await CategoryDescription.create(newCategorydesc);
      const cD2 = await CategoryDescription.create(newCategorydesc);
      cD2.setCategory(c2);
      cD1.CategoryId.should.be.eq(c1.id);
      cD2.CategoryId.should.be.eq(c2.id);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('create Category and set Parent should success.', async (done) => {
    try {
      const c1 = await Category.create(categoryData1);
      const c2 = await Category.create(categoryData2);
      await c1.setParent(c2);

      const newcategoryData2 = categoryData2;
      newcategoryData2.ParentId = c1.id;
      const c3 = await Category.create(newcategoryData2);

      c1.ParentId.should.be.eq(c2.id);
      c3.ParentId.should.be.eq(c1.id);
      done();
    } catch (e) {
      done(e);
    }
  });
});
