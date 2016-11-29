import {mockAdmin, unMockAdmin} from "../../../util/adminAuthHelper.js"

describe('about Allpay controllers', () => {
  before(async (done) => {
    try {
      await mockAdmin();
      done();
    } catch (e) {
      done(e);
    }
  });

  after(async (done)=>{
    try {
      await unMockAdmin();
      done();
    } catch (e) {
      done(e);
    }
  })
  
  describe('second if allpay order create success allpay will callback data , use paymentinfo() handle', () => {

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

    it('export csv', async (done) => {
      try {
        const webForm = {
          "draw": 1,
          "columns": [{
            "data": "id",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }, {
            "data": "MerchantTradeNo",
            "name": "",
            "searchable": false,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }, {
            "data": "RtnMsg",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }, {
            "data": "PaymentTypeDesc",
            "name": "",
            "searchable": false,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }, {
            "data": "invoiceNo",
            "name": "",
            "searchable": false,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }, {
            "data": "TradeAmt",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }, {
            "data": "vAccount",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }, {
            "data": "ItemNameArray",
            "name": "",
            "searchable": false,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }, {
            "data": "UserName",
            "name": "",
            "searchable": false,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }, {
            "data": "Email",
            "name": "",
            "searchable": false,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }, {
            "data": "Phone",
            "name": "",
            "searchable": false,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }, {
            "data": "Address",
            "name": "",
            "searchable": false,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }, {
            "data": "createdAt",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
              "value": "",
              "regex": false
            }
          }],
          "order": [{
            "column": 0,
            "dir": "asc"
          }],
          "start": 0,
          "length": 10,
          "search": {
            "value": "",
            "regex": false
          },
          "startDate": "1990/1/1",
          "endDate": "3000/1/1",
        };
        const res = await request(sails.hooks.http.app)
        .get(`/api/admin/allpay/export`).query(serialize(webForm));
        res.status.should.be.eq(200);
        console.log(res.text);
        done();
      } catch (e) {
        done(e);
      }
    });

  });

});
