import createHelper from "../../../util/createHelper.js"

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

      product1 = await createHelper.product('Product A');
      product2 = await createHelper.product('Product B');
      product3 = await createHelper.product('Product C');

      order = await createHelper.order([product1.id, product2.id, product3.id]);


      done();
    } catch (e) {
      done(e);
    }
  });

  it('User shopping car Order some Products.', async (done) => {
    try{
      const orderData = {
        products:[ {
          id: product1.id,
          quantity: 3,
        }, {
          id: product2.id,
          quantity: 2,
        }, {
          id: product3.id,
          quantity: 5,
        }],
        UserId: user.id,
      };

      const res = await request(sails.hooks.http.app)
      .post(`/api/order`).send( orderData );

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

      const orderPayment = await OrderPayment.findOne({
        where: {
          id: order.OrderPaymentId
        }
      });
      orderPayment.statue.should.be.eq('NEW');

      const orderPaymentHistory = await OrderPaymentHistory.findAll({
        where: {
          OrderPaymentId: orderPayment.id,
        },
      });
      orderPaymentHistory.length.should.be.eq(1);


      done();
    } catch (e) {
      done(e);
    }

  });
});
