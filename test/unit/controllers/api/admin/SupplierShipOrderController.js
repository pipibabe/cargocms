import createHelper from "../../../../util/createHelper.js"
import { mockAdmin, unMockAdmin } from "../../../../util/adminAuthHelper.js"

describe('about admin Supplier Ship Order controllers', () => {
  let product1, product2, user, order, supplier1;
  let supplier2,  orderProduct1, orderProduct2, supplierShipOrder1, supplierShipOrder2;
  let supplierShipOrderDescription1;
  before(async function(done){
    try{
      user = await User.create({
        username: 'buyer',
        email: 'conformBuyer@example.com',
        firstName: '劉',
        lastName: '廠商',
        birthday: new Date(),
        phone1: '(04)2201-9020',
        phone2: '0900-000-000',
        address: '西區台灣大道二段2號16F-1',
        address2: '台中市',
      });

      order = await createHelper.order(user.id);

      product1 = await createHelper.product('毒刺水母涼拌海蜇皮');
      supplier1 = await createHelper.supplier('火箭隊');
      await createHelper.supplierProduct(supplier1.id, product1.id);
      orderProduct1 = await createHelper.orderProduct(order.id, product1.id, 3);
      supplierShipOrder1 = await createHelper.supplierShipOrder(order.id, supplier1.id);
      supplierShipOrderDescription1 = await createHelper.supplierShipOrderDescription(supplierShipOrder1.id, orderProduct1.id);



      done();
    } catch (e) {
      done(e);
    }
  });

  describe('none admin', () => {
    it('should 403', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .post(`/api/admin/suppliershiporder/all`);
        res.status.should.be.eq(403);
        done();
      } catch (e) {
        done(e);
      }
    });
    it('should 403', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/suppliershiporder/status/${supplierShipOrder1.id}`)
        .send({
          status: 'conform',
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

    it('admin get Supplier Ship Order shoubld success.', async(done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .post(`/api/admin/suppliershiporder/all`)
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

    it('admin update status Supplier Ship Order shoubld success.', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/suppliershiporder/status/${supplierShipOrder1.id}`)
        .send({
          status: 'RECEIVED',
        });
        res.status.should.be.eq(200);

        const checkSupplierShipOrder = await SupplierShipOrder.findById(supplierShipOrder1.id);
        checkSupplierShipOrder.status.should.be.eq('RECEIVED');

        const checkSupplierShipOrderDescription = await SupplierShipOrderDescription.findById(supplierShipOrderDescription1.id);
        checkSupplierShipOrderDescription.status.should.be.eq('PROCESSING');

        done();
      } catch (e) {
        done(e);
      }
    });

    it('admin CANCELLED Supplier Ship Order desc cancel too.', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/suppliershiporder/status/${supplierShipOrder1.id}`)
        .send({
          status: 'CANCELLED',
        });
        res.status.should.be.eq(200);

        const checkSupplierShipOrder = await SupplierShipOrder.findById(supplierShipOrder1.id);
        checkSupplierShipOrder.status.should.be.eq('CANCELLED');

        const checkSupplierShipOrderDescription = await SupplierShipOrderDescription.findById(supplierShipOrderDescription1.id);
        checkSupplierShipOrderDescription.status.should.be.eq('CANCELLED');

        done();
      } catch (e) {
        done(e);
      }
    });

    describe('當有商品揀貨完成，將不可 CANCELLED', () => {

      before(async(done) => {
        try {
          let order2 = await createHelper.order(user.id);
          orderProduct1 = await createHelper.orderProduct(order2.id, product1.id, 3);
          supplierShipOrder1 = await createHelper.supplierShipOrder(order2.id, supplier1.id);
          supplierShipOrderDescription1 = await createHelper.supplierShipOrderDescription(supplierShipOrder1.id, orderProduct1.id, 'COMPLETED');
          done()
        } catch (e) {
          done(e)
        }
      })

      it('無法更改狀態', async(done) => {
        try {
          const res = await request(sails.hooks.http.app)
          .put(`/api/admin/suppliershiporder/status/${supplierShipOrder1.id}`)
          .send({
            status: 'CANCELLED',
          });
          res.status.should.be.eq(500);
          done()
        } catch (e) {
          done(e)
        }
      })
    });

  });


});
