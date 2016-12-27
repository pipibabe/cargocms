var sinon = require('sinon');
import {mockAdmin, unMockAdmin} from "../../../../util/adminAuthHelper.js"

describe('about Product Controller operations.', function() {
  let image, product1, product2, product3, product4, product5, user;
  let supplier1, supplier2;
  let category1, category2, Category3;

  before(async (done) => {
    try {

      image = await Image.create({
        filePath: 'http://www.labfnp.com/modules/core/img/update1.jpg',
        type: 'image/jpeg',
        storage: 'url',
      });
      product1 = {
        model: 'product1',
        sku: 1,
        upc: 1,
        ean: 1,
        jan: 1,
        isbn: 1,
        mpn: 1,
        location: 1,
        ImageId: image.id
      };
      product2 = {
        model: 'product2',
        sku: 1,
        upc: 1,
        ean: 1,
        jan: 1,
        isbn: 1,
        mpn: 1,
        location: 1,
        ImageId: image.id
      };
      product3 = {
        model: 'product3',
        sku: 1,
        upc: 1,
        ean: 1,
        jan: 1,
        isbn: 1,
        mpn: 1,
        location: 1,
        ImageId: image.id
      };

      product4 = {
        model: 'product4',
        sku: 1,
        upc: 1,
        ean: 1,
        jan: 1,
        isbn: 1,
        mpn: 1,
        location: 1,
        ImageId: image.id
      };

      category1 = await createHelper.supplierCategory('海產');
      category2 = await createHelper.supplierCategory('山產');

      product1 = await Product.create(product1);
      product2 = await Product.create(product2);
      product3 = await Product.create(product3);

      await createHelper.supplierProductCategory(category1.id, product1.id);
      await createHelper.supplierProductCategory(category1.id, product2.id);
      await createHelper.supplierProductCategory(category2.id, product3.id);

      supplier1 = await createHelper.supplier('火箭隊產銷部');
      await createHelper.supplierProduct(supplier1.id, product1.id);
      await createHelper.supplierProduct(supplier1.id, product2.id);
      await createHelper.supplierProduct(supplier1.id, product3.id);

      product4 = await Product.create(product4);
      product5 = await Product.create(product5);

      await createHelper.supplierProductCategory(category1.id, product4.id);
      await createHelper.supplierProductCategory(category2.id, product5.id);

      supplier2 = await createHelper.supplier('水艦隊產銷部');
      await createHelper.supplierProduct(supplier2.id, product4.id);
      await createHelper.supplierProduct(supplier2.id, product5.id);

      done();
    } catch (e) {
      done(e)
    }
  });

  after(async (done) => {
    await unMockAdmin();
    done();
  });

  it('find Product', async (done) => {
    try {
      const res = await request(sails.hooks.http.app)
      .get(`/api/product?start=0&length=10&category=${category1.id}&supplier=${supplier1.id}`);
      res.status.should.be.eq(200);
      res.body.items.length.should.be.eq(2);
      done();
    } catch (e) {
      done(e);
    }
  });


});
