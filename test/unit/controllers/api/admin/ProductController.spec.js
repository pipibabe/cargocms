var sinon = require('sinon');
import {mockAdmin, unMockAdmin} from "../../../../util/adminAuthHelper.js"

describe('about Product Controller operations.', function() {
  let image, product1, product2, product3;

  before(async (done) => {
    try {
      await mockAdmin();

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

      await Product.create(product1);
      await Product.create(product2);
      await Product.create(product3);
      done();
    } catch (e) {
      done(e)
    }
  });

  after(async (done) => {
    await unMockAdmin();
    done();
  });

  it('test for add a product.', async (done) => {
    try {
      const res = await request(sails.hooks.http.app)
      .post(`/api/admin/product`).send(product1);
      res.status.should.be.eq(200);
      res.body.success.should.be.eq(true);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('test for update a product.', async (done) => {
    try {
      const updatedProduct = await Product.create(product2);
      const res = await request(sails.hooks.http.app)
      .put(`/api/admin/product/${updatedProduct.id}`).send(product3);
      res.status.should.be.eq(200);
      res.body.success.should.be.eq(true);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('test for delete a product.', async (done) => {
    try {
      const deletedProduct = await Product.create(product3);
      const res = await request(sails.hooks.http.app)
      .delete(`/api/admin/product/${deletedProduct.id}`);
      res.status.should.be.eq(200);
      res.body.success.should.be.eq(true);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('test for list all products.', async (done) => {
    try {
      const res = await request(sails.hooks.http.app)
      .get(`/api/admin/product`);
      res.status.should.be.eq(200);
      res.body.data.items.length.should.be.greaterThan(3);
      done();
    } catch (e) {
      done(e);
    }
  });

});
