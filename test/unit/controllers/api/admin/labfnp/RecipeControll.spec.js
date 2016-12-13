var sinon = require('sinon');
import {mockAdmin, unMockAdmin} from "../../../../../util/adminAuthHelper.js"

describe('about admin api recipe Controller operation.', function() {

  const serialize = (obj, prefix) => {
    let str = [];
    for(let p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
        str.push(typeof v == "object" ?
          serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }

  let recipe;
  before(async (done) => {
    try {
      await mockAdmin();
      let user = await User.create({
        username: 'JohnGettingCSV',
        email: 'JohnGettingCSV@gmail.com',
        password: ''
      });
      recipe = await Recipe.create({
        formula:[
          {"drops":"1","scent":"BA69","color":"#E87728"},
          {"drops":"2","scent":"BA70","color":"#B35721"}
        ],
        formulaLogs: '',
        authorName: '王大明',
        perfumeName: 'John test perfume',
        message: 'this is love test',
        UserId: user.id,
      });
      console.log('create successful');
      done()
    } catch (e) {
      done(e)
    }
  });

  after(async (done) => {
    await unMockAdmin();
    done();
  });


  it('Recipe to CSV with Date should be success.', async (done) => {
    try {
      const webForm = { draw: '1',
        type: 'csv',
        startDate: '1900/01/01',
        endDate: '3000/01/01',
        columns:[
           { data: 'id', name: '' },
           { data: 'perfumeName', name: '', "searchable": "true"},
           { data: 'authorName', name: '' , "searchable": "true"},
           { data: 'createdAt', name: '', "searchable": "false"},
           { data: 'updatedAt', name: '', "searchable": "false"},
           { data: 'visibility', name: '', "searchable": "false"},
           { data: 'description', name: '', "searchable": "false"},
           { data: 'message', name: '', "searchable": "false"},
           { data: 'formula', name: '', "searchable": "false"},
        ],
        order: [ { column: '0', dir: 'asc' } ],
        search: { value: 'John', regex: 'false' },
        _: '1470989140227'
      }
      sails.log.error(serialize(webForm));
      const res = await request(sails.hooks.http.app)
      .get(`/api/admin/labfnp/recipe/export`).query(serialize(webForm));
      res.status.should.be.eq(200);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('Recipe to CSV with Date should be success. all date', async (done) => {
    try {
      const webForm = { draw: '1',
        type: 'csv',
        startDate: '',
        endDate: '',
        columns:[
           { data: 'id', name: '' },
           { data: 'perfumeName', name: '', "searchable": "true"},
           { data: 'authorName', name: '' , "searchable": "true"},
           { data: 'createdAt', name: '', "searchable": "false"},
           { data: 'updatedAt', name: '', "searchable": "false"},
           { data: 'visibility', name: '', "searchable": "false"},
           { data: 'description', name: '', "searchable": "false"},
           { data: 'message', name: '', "searchable": "false"},
           { data: 'formula', name: '', "searchable": "false"},
        ],
        order: [ { column: '0', dir: 'asc' } ],
        search: { value: 'John', regex: 'false' },
        _: '1470989140227'
      }
      const res = await request(sails.hooks.http.app)
      .get(`/api/admin/labfnp/recipe/export`).query(serialize(webForm));
      res.status.should.be.eq(200);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('Recipe to CSV with Date should be success. out of date', async (done) => {
    try {
      const webForm = { draw: '1',
        type: 'csv',
        startDate: '1900/1/1',
        endDate: '1901/1/1',
        columns:[
           { data: 'id', name: '' },
           { data: 'perfumeName', name: '', "searchable": "true"},
           { data: 'authorName', name: '' , "searchable": "true"},
           { data: 'createdAt', name: '', "searchable": "false"},
           { data: 'updatedAt', name: '', "searchable": "false"},
           { data: 'visibility', name: '', "searchable": "false"},
           { data: 'description', name: '', "searchable": "false"},
           { data: 'message', name: '', "searchable": "false"},
           { data: 'formula', name: '', "searchable": "false"},
        ],
        order: [ { column: '0', dir: 'asc' } ],
        search: { value: 'John', regex: 'false' },
        _: '1470989140227'
      }
      const res = await request(sails.hooks.http.app)
      .get(`/api/admin/labfnp/recipe/export`).query(serialize(webForm));
      res.status.should.be.eq(200);
      done();
    } catch (e) {
      done(e);
    }
  });


  describe('about Recipe Allpay Controller operation.', function() {
    let recipe;
    before(async(done) => {
      try {
        const user = await User.create({
          username: 'testAllpay',
          email: 'testAllpay@example.com',
          firstName: '大明',
          lastName: '王'
        })
        recipe = await Recipe.create({
          formula:[
            {"drops":"1","scent":"BA69","color":"#E87728"},
            {"drops":"2","scent":"BA70","color":"#B35721"}
          ],
          formulaLogs: '',
          authorName: '王大明',
          perfumeName: 'love',
          description: 'this is love',
          message: '備註',
        });
        const recipeOrder = await RecipeOrder.create({
          recipient: 'AAA',
          address: 'Taiwan',
          phone: '0953999999',
          email: 'da@gmail.com',
          note: '456',
          remark: '456',
          UserId: user.id,
          RecipeId: recipe.id,
        });
        await Allpay.create({
          MerchantTradeNo: 'sdkfsldfjkl23123s',
          RecipeOrderId: recipeOrder.id,
          ShouldTradeAmt: 22000
        });

        await Allpay.create({
          MerchantTradeNo: 'cavAsqwexc',
          RecipeOrderId: recipeOrder.id,
          ShouldTradeAmt: 22000
        });

        await Allpay.create({
          MerchantTradeNo: '2000132816da8db1',
          RecipeOrderId: recipeOrder.id,
          ShouldTradeAmt: 22000
        });

        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('paymentMethod is ATM', async (done) => {
      try {
        const data = {
          MerchantID: '123456789',
          MerchantTradeNo: 'sdkfsldfjkl23123s',
          RtnCode: '2',
          RtnMsg: 'Get VirtualAccount Succeeded',
          TradeNo: 'sdkfsldfjkl23',
          TradeAmt: 22000,
          PaymentType: 'ATM_TAISHIN',
          TradeDate: '2012/03/15 17:40:58',
          CheckMacValue: '18196F5D22DB1D0E2B4858C2B1719F40',
          BankCode: '812',
          vAccount: '9103522175887271',
          ExpireDate: '2013/12/16',
        };
        const res = await request(sails.hooks.http.app)
        .post(`/api/recipe/paymentinfo`).send(data);
        console.log(res.text);
        res.text.should.be.eq('1|OK');
        done();
      } catch (e) {
        done(e);
      }
    });

    it('third user payment completed allpay will callback data , use paid contr handle', async(done) => {
      try {
        const data = {
          MerchantID: '123456789',
          MerchantTradeNo: '2000132816da8db1',
          RtnCode: '1',
          RtnMsg: 'paid',
          TradeNo: '201203151740582564',
          TradeAmt: 22000,
          PaymentDate: '2012/03/16 12:03:12',
          PaymentType: 'ATM_TAISHIN',
          PaymentTypeChargeFee: 25,
          TradeDate: '2012/03/15 17:40:58',
          SimulatePaid: 0,
          CheckMacValue: 'FD79C15859F58D0BC24CDE67F59CC81C',
        };
        const res = await request(sails.hooks.http.app)
        .post(`/api/recipe/paid`).send(data);
        res.text.should.be.eq('1|OK');
        done();
      } catch (e) {
        done(e);
      }
    });
  });



});
