import createHelper from "../../../../util/createHelper.js"
import { mockAdmin, unMockAdmin } from "../../../../util/adminAuthHelper.js"

describe.only('about admin Order controllers', () => {
  let product1, product2, user, order, supplier1, supplier2,  orderProduct1, orderProduct2;
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

      product1 = await createHelper.product();
      supplier1 = await createHelper.supplier();
      await createHelper.supplierProduct(supplier1.id, product1.id);

      product2 = await createHelper.product();
      supplier2 = await createHelper.supplier();
      await createHelper.supplierProduct(supplier2.id, product2.id);

      order = await createHelper.order(user.id);

      orderProduct1 = await createHelper.orderProduct(order.id, product1.id);
      orderProduct2 = await createHelper.orderProduct(order.id, product2.id);

      done();
    } catch (e) {
      done(e);
    }
  });

  describe('none admin', () => {
    it('should 403', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .post(`/api/admin/order/conform/${order.id}`);
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

    it('admin conform Order to Supplier shoubld success.', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .post(`/api/admin/order/conform/${order.id}`);
        res.status.should.be.eq(200);
        res.body.data.item.OrderId.should.be.eq(order.id);
        res.body.data.item.OrderId.should.be.eq(supplier.id);

        const supplierOrderDescription = await SupplierOrderDescription.find({
          where: {
            orderId: order.id
          }
        });
        supplierOrderDescription.length.should.be.eq(2);
        (supplierOrderDescription.toJSON())[0].OrderProductId.should.eq(orderProduct1.id)
        (supplierOrderDescription.toJSON())[1].OrderProductId.should.eq(orderProduct2.id)
        done();
      } catch (e) {
        done(e);
      }
    });


  });


});
