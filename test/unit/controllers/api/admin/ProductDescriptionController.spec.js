import {mockAdmin, unMockAdmin} from "../../../../util/adminAuthHelper.js"

describe('about admin api ProductDescription Controller operation.', function() {
  describe('about ProductDescription Controller operation.', function() {

    let productDescription, product, image;
    before(async(done) => {
      try{
        await mockAdmin();

        image = await Image.create({
          filePath: '/upload/product_image_test.jpg',
          type: 'image/jpeg',
          storage: 'local',
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

        productDescription = await ProductDescription.create({
          name: "Product Name",
          description: "This is Product Description",
          tag: "Test",
          metaTitle: "Product Test. ",
          metaDescription: "For Product Test.",
          metaKeyword: "Test",
          ProductId: product.id
        });

        done();
      } catch(e){
        done(e);
      }
    });

    it('Product Description find All', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .get('/api/admin/productdescription/');

        res.status.should.be.eq(200);
        res.body.data.should.be.Array;
        res.body.data.items.length.should.be.above(0);

        done();
      } catch (e) {
        done(e);
      }
    });

    it('Product Description findOne', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .get(`/api/admin/productdescription/${productDescription.id}`);

        res.body.data.item.name.should.be.equal(productDescription.name);

        done();
      } catch (e) {
        done(e);
      }
    });

    it('Product Description create', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .post('/api/admin/productdescription/').send({
            name: "Web App",
            description: "Web App",
            tag: "Web",
            metaTitle: "welcome to Web App. ",
            metaDescription: "For Web App.",
            metaKeyword: "App",
            ProductId: product.id
        });

        console.log("Product Desc create =>",res.body.data.item);

        let productDesc = await ProductDescription.find({
          where: {
            name: 'Web App'
          }
        });
        res.status.should.be.eq(200);
        productDesc.name.should.be.equal('Web App');

        done();
      } catch (e) {
        done(e);
      }
    });

    it('Product Description update', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/productdescription/${productDescription.id}`)
        .send({
          name: 'product name updated'
        });
        let productDesc = await ProductDescription.findById(productDescription.id);

        res.status.should.be.eq(200);
        productDesc.name.should.be.equal('product name updated');

        done();
      } catch (e) {
        done(e);
      }
    });

    it('Product Description destroy', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .delete(`/api/admin/productdescription/${productDescription.id}`);

        let productDesc = await ProductDescription.findById(productDescription.id);

        res.status.should.be.eq(200);
        (productDesc === null).should.be.true;

        done();
      } catch (e) {
        done(e);
      }
    });

  });
})
