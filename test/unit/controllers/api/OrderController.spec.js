import createHelper from "../../../util/createHelper.js"
import { mockAdmin, unMockAdmin } from "../../../util/adminAuthHelper.js"

describe('about Order controllers', () => {

  let product1, product2, product3 , user;
  before(async function(done){
    try{
      user = await User.create({
        username: 'buyer',
        email: 'buyer@example.com',
        firstName: '劉',
        lastName: '拜爾',
        birthday: new Date(),
        phone1: '(04)2201-9020',
        phone2: '0900-000-000',
        address: '西區台灣大道二段2號16F-1',
        address2: '台中市',
      });

      await mockAdmin();

      product1 = await createHelper.product('Product A');
      product2 = await createHelper.product('Product B');
      product3 = await createHelper.product('Product C');

      const orderStatusData = [
        {
          name:"NEW",
          languageId:0
        },{
          name:"PAID",
          languageId:0
        },{
          name:"PROCESSING",
          languageId:0
        },{
          name:"SHIPPED",
          languageId:0
        },{
          name:"CANCELLED",
          languageId:0
        },{
          name:"COMPLETED",
          languageId:0
        },{
          name:"DENIED",
          languageId:0
        },{
          name:"CANCELED REVERSAL",
          languageId:0
        },{
          name:"FAILED",
          languageId:0
        },{
          name:"REFUNDED",
          languageId:0
        },{
          name:"REVERSED",
          languageId:0
        },{
          name:"CHARGEBACK",
          languageId:0
        },{
          name:"PENDING",
          languageId:0
        },{
          name:"VOIDED",
          languageId:0
        },{
          name:"PROCESSED",
          languageId:0
        },{
          name:"EXPIRED",
          languageId:0
        }
      ]

      await OrderStatus.bulkCreate(orderStatusData);

      done();
    } catch (e) {
      done(e);
    }
  });

  after(async (done) => {
    await unMockAdmin();
    done();
  });

  it('User shopping car Order some Products.', async (done) => {
    try{
      let product = [
        {
          id: product1.id,
          quantity: 3,
        },{
          id: product2.id,
          quantity: 2,
        },{
          id: product3.id,
          quantity: 5,
        }];
      product = JSON.stringify(product);

      const orderData = {
        lastname: '劉',
        firstname: '拜爾',
        products: product,
        telephone: '04-22019020',
        fax: '',
        email: 'buyer@gmail.com',
        shippingFirstname: '拜爾',
        shippingLastname: '劉',
        shippingAddress1: '西區台灣大道二段2號16F-1',
        shippingCity: '台中市',
        shippingPostcode: '402',
        shippingMethod: '低溫宅配',
        shippingCode: 'ship123456',
        ip: '',
        forwardedIp: '',
        userAgent: '',
        comment: '這是一個訂購測試'
      };

      const res = await request(sails.hooks.http.app)
      .post(`/api/order`).set('Accept', 'application/json').send( orderData );

      res.status.should.be.eq(200);

      const order = await Order.findOne({
        where: {
          id: res.body.data.item.id
        }
      });

      const orderProduct = await OrderProduct.findAll({
        where: {
          OrderId: res.body.data.item.id
        }
      });

      orderProduct.length.should.be.equal(3);

      // const orderPayment = await OrderPayment.findOne({
      //   where: {
      //     id: order.OrderPaymentId
      //   },
      //   include: OrderPaymentStatus
      // });
      // orderPayment.status.should.be.eq('NEW');
      //
      // const orderPaymentHistory = await OrderPaymentHistory.findAll({
      //   where: {
      //     OrderPaymentId: orderPayment.id,
      //   },
      // });
      // orderPaymentHistory.length.should.be.eq(1);

      done();
    } catch (e) {
      done(e);
    }

  });

  it('Order Controller get Order Info data', async(done) => {
    try{
      const res = await request(sails.hooks.http.app)
      .get(`/orderinfo/1`);

      res.status.should.be.eq(200);
      // res.body.data.item.invoiceNo.should.be.eq('87654321');
      // res.body.data.product.length.should.be.eq(3);

      done();
    } catch (e) {
      done(e);
    }
  });
});
