import moment from 'moment';
var sinon = require('sinon');
describe('about export service operation.', function() {

  let recipe;
  before(async (done) => {
    try {
      let user = await User.create({
        username: 'JohnExport',
        email: 'JohnExport@gmail.com',
        password: ''
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
        perfumeName: 'JohnExport test perfume',
        message: 'this is love test',
        UserId: user.id,
      });
      console.log('create successful');
      done()
    } catch (e) {
      done(e)
    }
  });

  after((done) => {
    AuthService.getSessionUser.restore();
    done();
  });

  it('query Recipe to CSV with Date should be success.', async (done) => {
    try {
      const query = { draw: '1',
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
        search: { value: 'JohnExport', regex: 'false' },
        _: '1470989140227'
      }
      const result = await ExportService.query({query, modelName: 'recipe'});
      result.length.should.be.eq(1);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('query Recipe to CSV with Date should be success. all date', async (done) => {
    try {
      const query = { draw: '1',
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
        search: { value: 'JohnExport', regex: 'false' },
        _: '1470989140227'
      }
      const result = await ExportService.query({query, modelName: 'recipe'});
      result.length.should.be.eq(1);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('query Recipe to CSV with Date should be success. out of date', async (done) => {
    try {
      const query = { draw: '1',
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
        search: { value: 'JohnExport', regex: 'false' },
        _: '1470989140227'
      }
      const result = await ExportService.query({query, modelName: 'recipe'});
      result.length.should.be.eq(0);
      done();
    } catch (e) {
      done(e);
    }
  });


  it('export Recipe to CSV with Date should be success.', async (done) => {
    try {
      const content = [
        {
          "formula": [
            {
              "drops": "1",
              "scent": "BA69",
              "color": "#E87728"
            },
            {
              "drops": "2",
              "scent": "BA70",
              "color": "#B35721"
            }
          ],
          "formulaTotalDrops": 3,
          "authorFbPage": "https://www.facebook.com/LabFnP",
          "message": "this is love test",
          "description": "",
          "coverPhoto": "/assets/labfnp/img/recipe-default-cover.1.jpg",
          "visibilityDesc": "非公開",
          "updatedAt": "2016/09/20 18:08:00",
          "createdAt": "2016/09/20 18:08:00",
          "createdAtIso": "2016-09-20T10:08:59.000Z",
          "updatedAtIso": "2016-09-20T10:08:59.000Z",
          "id": 1,
          "formulaLogs": "",
          "authorName": "王大明",
          "perfumeName": "John test perfume",
          "createdBy": "scent",
          "totalDrops": 0,
          "visibility": "PRIVATE",
          "UserId": 2,
          "coverPhotoId": null
        }
      ]
      const result = await ExportService.export({ content });
      sails.log.debug(result);
      done();
    } catch (e) {
      done(e);
    }
  });


  it('export Recipe to CSV test Special text should be success.', async (done) => {
    try {
      const content = [
        { "text": "周咏蒨" },
        { "text": "등원청" },
        { "text": "訂購者" },
        { "text": "안갯길" },
        { "text": "羅筑儀" },
        { "text": "香港尖沙咀金马伦道48号中国保险大厦15楼B室" },
        { "text": "20life LM•BU•WH" },
      ]
      const result = await ExportService.export({ content });
      sails.log.debug(result);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('export content to Excel test Special text should be success.', async (done) => {
    try {
      const fileName = 'TestWorkSheet';
      const columns = [
        { caption: '付款帳號', type: 'string' },
        { caption: '訂購物品', type: 'string' },
        { caption: '訂購人', type: 'string' },
        { caption: '收件人', type: 'string' },
        { caption: '創作人', type: 'string' },
        { caption: '備註', type: 'string' },
        { caption: '香味分子 1', type: 'string' },
        { caption: '香味分子 1 比例', type: 'number' },
        { caption: '香味分子 2', type: 'string' },
        { caption: '香味分子 2 比例', type: 'number' },
        { caption: '香味分子 3', type: 'string' },
        { caption: '香味分子 3 比例', type: 'number' },
        { caption: '香味分子 4', type: 'string' },
        { caption: '香味分子 4 比例', type: 'number' },
        { caption: '香味分子 5', type: 'string' },
        { caption: '香味分子 5 比例', type: 'number' },
        { caption: '香味分子 6', type: 'string' },
        { caption: '香味分子 6 比例', type: 'number' },
        { caption: '電話', type: 'string' },
        { caption: '住址', type: 'string' },
        { caption: '訂單狀態', type: 'string' },
        { caption: '交易訊息', type: 'string' },
        { caption: '訂單建立時間', type: 'string' },
        { caption: '香味清單', type: 'string' }
      ];

      const format = (items) => {
        let result = [];
        for (let data of items) {
          if (data.PaymentType === 'aio') continue;
          let formatted = [
            `="${data.vAccount || ''}"`, //付款帳號
            data.ItemNameArray,          //訂購物品
            data.UserName,               //訂購人
            data.RecipeOrder.recipient,  //收件人
            data.RecipeOrder.Recipe ? data.RecipeOrder.Recipe.authorName : '', //創作人
            data.Note,                  //備註
          ];
          let scentList = '';           //香味清單
          if (data.RecipeOrder && data.RecipeOrder.Recipe) {
            data.RecipeOrder.Recipe.formula.forEach((formula, index) => {
              if (formula.scent && formula.drops > 0) {
                scentList += `${formula.scent}:${formula.drops} `;
                 //香味分子 & 香味分子 比例
                formatted.push(`${formula.scent}`),
                formatted.push(Math.ceil(formula.drops / data.RecipeOrder.Recipe.formulaTotalDrops * 10000)/10000);
              }
            });
          }
          formatted.push(
            `="${data.Phone || ''}"`,  //電話
            data.Address,              //住址
            data.RecipeOrder.productionStatusDesc,  //訂單狀態
            data.RtnMsg,              //交易訊息
            moment(new Date(data.createdAt)).format("YYYY/MM/DD HH:mm"), //訂單建立時間
            scentList                 //香味清單
          );

          result.push(formatted);
        };
        return result;
      }

      const content = [
        {
        PaymentDate: "2016/08/30 16:11:00",
        Recipient: null,
        Address: null,
        Phone: null,
        Email: null,
        Note: null,
        Remark: "123",
        invoiceNo: null,
        ItemNameArray: "love again",
        UserName: "大明王",
        shipping: "",
        shippingDesc: "",
        trackingNumber: "",
        PaymentTypeDesc: "台新銀行 ATM",
        createdAt: "2016/11/02 10:06",
        id: 1,
        TradeNo: "1608301610017019",
        MerchantTradeNo: "57feb73f",
        RtnCode: 1,
        RtnMsg: "付款成功",
        TradeDate: "2016-08-30T08:10:21.000Z",
        PaymentType: "ATM_TAISHIN",
        ShouldTradeAmt: 999,
        TradeAmt: 999,
        BankCode: "812",
        vAccount: "9966627013152469",
        ExpireDate: "2016/09/02",
        PaymentNo: null,
        Barcode1: null,
        Barcode2: null,
        Barcode3: null,
        CheckMacValue: null,
        MerchantTradeDate: null,
        updatedAt: "2016-11-02T02:06:31.000Z",
        EventOrderId: null,
        RecipeOrderId: 1,
        RecipeOrder: {
        productionStatusDesc: "NEW",
        ItemNameArray: [
        "love again"
        ],
        updatedAt: "2016/11/02 10:06:00",
        createdAt: "2016/11/02 10:06:00",
        id: 1,
        recipient: null,
        address: null,
        phone: null,
        email: null,
        note: null,
        remark: "123",
        invoiceNo: null,
        productionStatus: "NEW",
        token: null,
        shipping: null,
        trackingNumber: null,
        UserId: 1,
        RecipeId: 2,
        User: {
          birthday: "2016/11/02",
          displayName: "大明王",
          rolesArray: [ ],
          lastLogin: null,
          updatedAt: "2016/11/02 10:06:00",
          createdAt: "2016/11/02 10:06:00",
          id: 1,
          username: "user",
          email: "user@example.com",
          firstName: "王",
          lastName: "大明",
          phone1: "(04)2201-9020",
          phone2: "0900-000-000",
          address: "西區台灣大道二段2號16F-1",
          address2: "台中市",
          locale: null,
          userAgent: null,
          lastLoginIP: null,
          lastLoginLat: null,
          lastLoginLng: null,
          facebookId: null,
          avatar: "/assets/admin/img/avatars/default.png",
          avatarThumb: "/assets/admin/img/avatars/default.png",
          score: 0,
          resetPasswordToken: null
        },
        Recipe: {
        formula: [
          {
          drops: "1",
          scent: "BA69",
          color: "#E87728"
          },
          {
          drops: "2",
          scent: "BA70",
          color: "#B35721"
          }
        ],
        formulaTotalDrops: 3,
        authorFbPage: "https://www.facebook.com/LabFnP",
        message: "備註",
        description: "this is love again",
        coverPhoto: "/assets/labfnp/img/recipe-default-cover.2.jpg",
        visibilityDesc: "公開",
        updatedAt: "2016/11/02 10:06:00",
        createdAt: "2016/11/02 10:06:00",
        createdAtIso: "2016-11-02T02:06:31.000Z",
        updatedAtIso: "2016-11-02T02:06:31.000Z",
        displayFormula: [
          {
            index: 0,
            value: "BA69 - 1滴(33.3333%)"
          },
          {
            index: 1,
            value: "BA70 - 2滴(66.6667%)"
          }
        ],
        id: 2,
        hashId: "BJxk45pIle",
        formulaLogs: "",
        authorName: "王大明",
        perfumeName: "love again",
        createdBy: "scent",
        visibility: "PUBLIC",
        invoicenum: null,
        address: null,
        phonenum: null,
        created: null,
        sourceId: null,
        UserId: 1,
        coverPhotoId: null
        }
        }
      }];

      const result = await ExportService.exportExcel({ content, format, fileName, columns });
      sails.log.debug(result);
      done();
    } catch (e) {
      done(e);
    }
  });

  describe.skip('about export service operation.', function() {
    it('parse excel ', async (done) => {
      try {
        const columns = [{
          name: 'MerchantTradeNo',
          index: 2,
        }]
        const result = await ExportService.parseExcel({
          fileName: '順豐form.xlsx',
          startIndex: 1,
          sheetIndex: 0,
          columns,
         });
         sails.log.info(result);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
