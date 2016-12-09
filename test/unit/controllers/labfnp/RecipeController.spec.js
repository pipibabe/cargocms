var sinon = require('sinon');
describe('about Recipe Controller operation.', function() {

  let recipe, user;
  before(async (done) => {
    try {
      user = await User.create({
        username: 'RecipeOrder',
        email: 'RecipeOrderallpay@gmail.com',
        password: '',
        // phone1: '0900000000'
      });
      sinon.stub(AuthService, 'getSessionUser', (req) => {
        return user.toJSON();
      });
      recipe = await Recipe.create({
        formula:[
          {"drops":"1","scent":"BA69","color":"#E87728"},
          {"drops":"2","scent":"BA70","color":"#B35721"}
        ],
        formulaLogs: '',
        authorName: '王大明',
        perfumeName: 'love test',
        message: 'this is love test',
        UserId: user.id,
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

  it('Recipe like action should be success.', async (done) => {
    try {
      const token = '8178e7c8e66a68421af84bc7b77e2e40'
      const repetOrder = [];
      repetOrder.push(request(sails.hooks.http.app)
        .post(`/recipe/allpay/${recipe.id}?hashId=${recipe.hashId}`)
        .send({
          id: 1,
          perfumeName: 'love',
          description: 'this is love',
          message: 'test',
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
      repetOrder.push(request(sails.hooks.http.app)
        .post(`/recipe/allpay/${recipe.id}?hashId=${recipe.hashId}`)
        .send({
          id: 1,
          perfumeName: 'love',
          description: 'this is love',
          message: 'test',
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
      repetOrder.push(request(sails.hooks.http.app)
        .post(`/recipe/allpay/${recipe.id}?hashId=${recipe.hashId}`)
        .send({
          id: 1,
          perfumeName: 'love',
          description: 'this is love',
          message: 'test',
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
      repetOrder.push(request(sails.hooks.http.app)
        .post(`/recipe/allpay/${recipe.id}?hashId=${recipe.hashId}`)
        .send({
          id: 1,
          perfumeName: 'love',
          description: 'this is love',
          message: 'test',
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
      repetOrder.push(request(sails.hooks.http.app)
        .post(`/recipe/allpay/${recipe.id}?hashId=${recipe.hashId}`)
        .send({
          id: 1,
          perfumeName: 'love',
          description: 'this is love',
          message: 'test',
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
      repetOrder.push(request(sails.hooks.http.app)
        .post(`/recipe/allpay/${recipe.id}?hashId=${recipe.hashId}`)
        .send({
          id: 1,
          perfumeName: 'love',
          description: 'this is love',
          message: 'test',
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
      repetOrder.push(request(sails.hooks.http.app)
        .post(`/recipe/allpay/${recipe.id}?hashId=${recipe.hashId}`)
        .send({
          id: 1,
          perfumeName: 'love',
          description: 'this is love',
          message: 'test',
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
      repetOrder.push(request(sails.hooks.http.app)
        .post(`/recipe/allpay/${recipe.id}?hashId=${recipe.hashId}`)
        .send({
          id: 1,
          perfumeName: 'love',
          description: 'this is love',
          message: 'test',
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
      const result = await Promise.all(repetOrder);
      sails.log.debug(result[0].status,result[1].status);

      // await request(sails.hooks.http.app)
      // .post(`/recipe/allpay/${recipe.id}?hashId=${recipe.hashId}`)
      // .send({
      //   id: 1,
      //   perfumeName: 'love',
      //   description: 'this is love',
      //   message: 'test',
      //   recipient: 'admin',
      //   phone: '0900000000',
      //   address: 'taiwan',
      //   email: 'admin@example.com',
      //   note: 1,
      //   paymentMethod: 'gotoShop',
      //   invoiceNo: 'LB-12345678',
      //   token: '123123123123123123',
      // })
      const check = await RecipeOrder.findAll({ where: { token }});
      check.length.should.be.eq(1);
      done();
    } catch (e) {
      done(e);
    }
  });


});
