import createHelper from "../../../util/createHelper.js"

describe('about Order controllers', () => {

  let product1, product2, product3 , user;
  let order, orderStatus;
  before(async function(done){
    try{
      user = await User.create({
        username: 'payment',
        email: 'payment@example.com',
        firstName: '張',
        lastName: '拍敏',
        birthday: new Date(),
        phone1: '(04)2201-9020',
        phone2: '0900-000-000',
        address: '西區台灣大道二段2號16F-1',
        address2: '台中市',
      });

      product1 = await createHelper.product('Product A');
      product2 = await createHelper.product('Product B');
      product3 = await createHelper.product('Product C');

      orderStatus = await createHelper.orderStatus('NEW');
      order = await createHelper.order([product1.id, product2.id, product3.id], orderStatus.id);


      done();
    } catch (e) {
      done(e);
    }
  });

  it('payment fail', async (done) => {
    try{
      const paymentData = {

      };

      const res = await request(sails.hooks.http.app)
      .post(`/api/payment`).send( paymentData );

      res.status.should.be.eq(200);
      res.body.itme.status.should.be.eq(paymentData.);

      const orderPaymentHistory = await OrderPaymentHistory.findAll();
      orderPaymentHistory.length.should.be.eq(1);

      done();
    } catch (e) {
      done(e);
    }

  });

  it('payment success', async (done) => {
    try{
      const paymentData = {

        status: 'COMPLETE',
      };

      const res = await request(sails.hooks.http.app)
      .post(`/api/payment`).send( paymentData );

      res.status.should.be.eq(200);
      res.body.itme.status.should.be.eq(paymentData.status);

      const orderPaymentHistory = await OrderPaymentHistory.findAll();
      orderPaymentHistory.length.should.be.eq(2);

      done();
    } catch (e) {
      done(e);
    }

  });
});
