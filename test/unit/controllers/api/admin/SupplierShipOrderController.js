import createHelper from "../../../../util/createHelper.js"
import { mockAdmin, unMockAdmin } from "../../../../util/adminAuthHelper.js"

describe.only('about admin Supplier Ship Order controllers', () => {
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

      product1 = await createHelper.product();
      supplier1 = await createHelper.supplier();
      await createHelper.supplierProduct(supplier1.id, product1.id);
      orderProduct1 = await createHelper.orderProduct(order.id, product1.id);
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
        .put(`/api/admin/suppliershiporderdescription/${supplierShipOrder1.id}`)
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

    it('admin update status Supplier Ship Order shoubld success.', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/suppliershiporderdescription/${supplierShipOrder1.id}`)
        .send({
          status: 'conform',
        });
        res.status.should.be.eq(200);

        const checkSupplierShipOrder = await SupplierShipOrder.findById(supplierShipOrder1.id);
        checkSupplierShipOrder.status.should.be.eq('conform');

        const checkSupplierShipOrderDescription = await ShipOrderDescription.findById(supplierShipOrderDescription1.id);
        checkSupplierShipOrderDescription.status.shoubld.be.eq('processing');

        done();
      } catch (e) {
        done(e);
      }
    });


  });


});