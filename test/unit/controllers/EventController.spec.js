var sinon = require('sinon');
describe.skip('about Event Controller operation.', function() {

  let event, event2, user;
  before(async (done) => {
    try {
      user = await User.create({
        username: 'EventOrder',
        // email: 'EventOrder@gmail.com',
        password: '',
        // phone1: '0900000000'
      });
      sinon.stub(AuthService, 'getSessionUser', (req) => {
        return user.toJSON();
      });
      event = await Event.create({
        "limit": 5,
        "signupCount": 0,
        "price": 1780,
        "title": "早鳥單人工作坊＋客製化香水服務",
        "description": "包含製作你的第一瓶個人化香水製作服務 （含運）與調香工作坊Workshop門票一張",
        "sellStartDate": "2016-11-01 15:59:44",
        "sellEndDate": "2016-11-01 15:59:44",
        "eventStartDate": "2016-11-01 15:59:44",
        "eventEndDate": "2016-11-01 15:59:44",
      });

      event2 = await Event.create({
        "limit": 5,
        "signupCount": 5,
        "price": 1780,
        "title": "早鳥單人工作坊＋客製化香水服務",
        "description": "包含製作你的第一瓶個人化香水製作服務 （含運）與調香工作坊Workshop門票一張",
        "sellStartDate": "2016-11-01 15:59:44",
        "sellEndDate": "2016-11-01 15:59:44",
        "eventStartDate": "2016-11-01 15:59:44",
        "eventEndDate": "2016-11-01 15:59:44",
      });

      done()
    } catch (e) {
      done(e)
    }
  });

  after((done) => {
    AuthService.getSessionUser.restore();
    done();
  });

  it('Event order action should be success.', async (done) => {
    try {
      const token = '8178e7c8e66a68421af84bc7b77e2e40'
      const eventOrder = [];
      eventOrder.push(request(sails.hooks.http.app)
        .post(`/event/allpay/${event.id}`)
        .send({
          id: 1,
          recipient: 'admin',
          phone: '0900000000',
          address: 'taiwan',
          email: 'admin@example.com',
          note: 1,
          paymentMethod: 'gotoShop',
          invoiceNo: 'LB-12345678',
          token,
        })
      );
      eventOrder.push(request(sails.hooks.http.app)
        .post(`/event/allpay/${event.id}`)
        .send({
          id: 1,
          recipient: 'admin',
          phone: '0900000000',
          address: 'taiwan',
          email: 'admin@example.com',
          note: 1,
          paymentMethod: 'gotoShop',
          invoiceNo: 'LB-12345678',
          token,
        })
      );
      const result = await Promise.all(eventOrder);
      sails.log.debug(result[0].status,result[1].status);
      const check = await EventOrder.findAll({ where: { token }});
      check.length.should.be.eq(1);
      done();
    } catch (e) {
      done(e);
    }
  });


  it('Event over limit order action should be success.', async (done) => {
    try {
      const eventOrder = [];
      await request(sails.hooks.http.app)
      .post(`/event/allpay/${event2.id}`)
      .send({
        id: 1,
        recipient: 'admin',
        phone: '0900000000',
        address: 'taiwan',
        email: 'admin@example.com',
        note: 1,
        paymentMethod: 'gotoShop',
        invoiceNo: 'LB-12345678',
        token: '8178e7c8e66a68421af84bc7b77eass',
      })
      await request(sails.hooks.http.app)
      .post(`/event/allpay/${event.id}`)
      .send({
        id: 1,
        recipient: 'admin',
        phone: '0900000000',
        address: 'taiwan',
        email: 'admin@example.com',
        note: 1,
        paymentMethod: 'gotoShop',
        invoiceNo: 'LB-12345678',
        token: '1178e7c8e66a68421af84bc7b77eass',
      })
      done();
    } catch (e) {
      done(e);
    }
  });


});
