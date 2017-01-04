import createHelper from "../../../../util/createHelper.js"
import { mockAdmin, unMockAdmin } from "../../../../util/adminAuthHelper.js"

describe('about admin Supplier Ship Order Description controllers', () => {
  let product1, product2, user, order, supplier;
  let supplier2,  orderProduct1, orderProduct2, supplierShipOrder;
  let supplierShipOrderProduct1, supplierShipOrderProduct2;
  before(async function(done){
    try{
      user = await User.create({
        username: 'SupplierShipBuyer',
        email: 'SupplierShipBuyer@example.com',
        firstName: '劉',
        lastName: '廠商',
        birthday: new Date(),
        phone1: '(04)2201-9020',
        phone2: '0900-000-000',
        address: '西區台灣大道二段2號16F-1',
        address2: '台中市',
      });

      order = await createHelper.order(user.id);

      product1 = await createHelper.product('深海現撈鯉魚王');
      product2 = await createHelper.product('千年水箭龜');
      supplier = await createHelper.supplier('火箭隊第二分隊');
      await createHelper.supplierProduct(supplier.id, product1.id);
      await createHelper.supplierProduct(supplier.id, product2.id);
      orderProduct1 = await createHelper.orderProduct(order.id, product1.id, 1);
      orderProduct2 = await createHelper.orderProduct(order.id, product2.id, 1);
      supplierShipOrder = await createHelper.supplierShipOrder(order.id, supplier.id);

      supplierShipOrderProduct1 = await createHelper.supplierShipOrderProduct(supplierShipOrder.id, orderProduct1.id);
      supplierShipOrderProduct2 = await createHelper.supplierShipOrderProduct(supplierShipOrder.id, orderProduct2.id);

      done();
    } catch (e) {
      done(e);
    }
  });

  describe('none admin', () => {
    it('should 403', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .post(`/api/admin/suppliershiporderproduct/all`);
        res.status.should.be.eq(403);
        done();
      } catch (e) {
        done(e);
      }
    });
    it('should 403', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/suppliershiporderproduct/status/${supplierShipOrderProduct1.id}`)
        .send({
          status: 'COMPLETED',
        });
        res.status.should.be.eq(403);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('is admin', () => {
    before(async function(done){
      await mockAdmin();
      done();
    });

    after(async (done) => {
      await unMockAdmin();
      done();
    });

    it('admin get Supplier Ship Order Product shoubld success.', async(done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .post(`/api/admin/suppliershiporderproduct/all`)
        .send({
          startDate: '1900/01/01',
          endDate: '3000/01/01',
          columns:[
             { data: 'id', name: '', "searchable": "true"},
          ],
          order: [ { column: '0', dir: 'asc' } ],
          search: { value: '', regex: 'false' },
          _: '1470989140227'
        });
        res.status.should.be.eq(200);
        done()
      } catch (e) {
        done(e)
      }
    });

    it('admin update status Supplier Ship Order Product shoubld success.', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/suppliershiporderproduct/status/${supplierShipOrderProduct1.id}`)
        .send({
          status: 'COMPLETED',
        });
        console.log(res);
        res.status.should.be.eq(200);

        const checkShipOrderProduct = await SupplierShipOrderProduct.findById(supplierShipOrderProduct1.id);
        checkShipOrderProduct.status.should.be.eq('COMPLETED');

        done();
      } catch (e) {
        done(e);
      }
    });

    it('finish pick product', async (done) => {
      try{

        const finishShipOrderProduct1 = await request(sails.hooks.http.app)
        .put(`/api/admin/suppliershiporderproduct/status/${supplierShipOrderProduct1.id}`)
        .send({
          status: 'COMPLETED',
        });
        finishShipOrderProduct1.status.should.be.eq(200);
        const checkShipOrderProduct1 = await SupplierShipOrderProduct.findById(supplierShipOrderProduct1.id);
        checkShipOrderProduct1.status.should.be.eq('COMPLETED');

        const finishShipOrderProduct2 = await request(sails.hooks.http.app)
        .put(`/api/admin/suppliershiporderproduct/status/${supplierShipOrderProduct2.id}`)
        .send({
          status: 'COMPLETED',
        });
        finishShipOrderProduct2.status.should.be.eq(200);
        const checkShipOrderProduct2 = await SupplierShipOrderProduct.findById(supplierShipOrderProduct2.id);
        checkShipOrderProduct2.status.should.be.eq('COMPLETED');

        const checkSupplierShipOrder = await SupplierShipOrder.findById(supplierShipOrder.id);
        checkSupplierShipOrder.status.should.be.eq('COMPLETED');



        done();
      } catch (e) {
        done(e);
      }
    });


  });


});
