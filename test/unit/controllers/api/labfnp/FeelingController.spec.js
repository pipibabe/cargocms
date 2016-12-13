import {mockAdmin, unMockAdmin} from "../../../../util/adminAuthHelper.js"
describe('about admin api Feeling Controller operation.', function() {
  describe('create ,update, delete a feeling with scent.', () => {
    let feeling, feeling2;
    before( async(done) => {
      try{
        await Scent.create({
          "name": "BU2",
          "title": "Ambroxan",
          "description": "濃郁而優雅的琥珀味，當中含豐富的木質香氣，提供香水溫暖調性。從優雅的花香調到現代東方調都適用。由於其香氣濃郁性，使用低劑量即可達最佳效果。相反的，高劑量使用可以增加持久性。",
          "sequence": 2,
          "feelings": [{key:"木質",value:"7"},{key:"日曬干草",value:"1"},{key:"紙味",value:"1"},{key:"沉靜",value:"1"},{key:"和平",value:"1"},{key:"日式房子",value:"1"},{key:"小木屋",value:"2"},{key:"大樹",value:"1"},{key:"清爽的樹皮",value:"1"},{key:"老舊的",value:"1"},{key:"風吹過木頭",value:"1"},{key:"走在阿公家",value:"1"},{key:"男人味",value:"3"},{key:"帥的人味",value:"1"},{key:"溫柔男子",value:"1"},{key:"中年客人的味道",value:"1"},{key:"CK味",value:"1"},{key:"噴太多古龍水",value:"1"},{key:"外國人",value:"1"},{key:"暖甜",value:"1"},{key:"柔和",value:"1"},{key:"厚實",value:"1"},{key:"深沈",value:"3"},{key:"辛辣",value:"1"},{key:"酒吧",value:"1"},{key:"蒸餾酒",value:"1"},{key:"瑪格麗特（調酒）",value:"1"},{key:"Vodka",value:"1"},{key:"琥珀",value:"2"},{key:"古龍水",value:"1"},{key:"森林",value:"1"},{key:"芬多精",value:"2"},{key:"麥克筆的味道",value:"1"},{key:"顏料",value:"1"},{key:"膨膨沐浴露",value:"1"}],
          // "ScentNoteId": 7
        });

        await Scent.create({
          "name": "C4",
          "title": "Explosion Explosion Explosion",
          "description": "遇到任何問題，用C4就對了。",
          "sequence": 3,
          "feelings": [],
        });

        await Scent.create({
          "name": "BJ4",
          "title": "不解釋",
          "description": "不須多做解釋，大家都懂。",
          "sequence": 4,
          "feelings": [],
        });

        feeling = await Feeling.create({
          "title": "木質",
          "scentName": "BU2",
          "totalRepeat": "22",
          "score": "7",
        });

        feeling2 = await Feeling.create({
          "title": "木質",
          "scentName": "C4",
          "totalRepeat": "22",
          "score": "1",
        });

        await mockAdmin();
        done();
      } catch (e) {
        done(e);
      }

    });

    after(async (done) => {
      await unMockAdmin();
      // AuthService.getSessionUser.restore();
      done();
    });

    it('Create a new Feeling with title 木質, scentName BJ4.', async (done) => {
      try{
        const data = {
          title: "木質",
          scentName: "BJ4"
        };
        const res = await request(sails.hooks.http.app)
        .post(`/api/admin/labfnp/feeling`).send(data);

        console.log(res);

        let result = await Feeling.findOne({
          where: {
            id : feeling.id
          }
        })

        //木質 totalRepeat 22 should + 1 equal 23
        result.totalRepeat.should.be.equal("23");

        done();
      } catch (e) {
        done(e);
      }
    });

    it('update a Feeling title.', async (done) => {
      try{
        const data = {
          title: "爆炸的味道",
          score: "1"
        }
        // update feeling2 , 木質 > 爆炸的味道
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/labfnp/feeling/${feeling2.id}`).send(data);

        // 木質 totalRepeat should -1 ,equal 22
        let result = await Feeling.findOne({
          where: {title: "木質"}
        });
        result.totalRepeat.should.be.equal("22");
        // 爆炸的味道 totalRepeat should equal 1
        result = await Feeling.findById(feeling2.id);
        result.totalRepeat.should.be.equal("1");
        // scent C4 , feelings should have {key:爆炸的味道, value: 1}
        result = await Scent.findOne({
          where: {
            name: feeling2.scentName
          }
        });

        result.feelings[0].key.should.be.equal("爆炸的味道");
        result.feelings[0].value.should.be.equal("1");

        done();
      } catch(e) {
        done(e);
      }
    });

    it('update a Feeling score.', async (done) => {
      try{
        const data = {
          title: "爆炸的味道",
          score: "87"
        }
        // update feeling2 爆炸的味道 score 1 >> 87
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/labfnp/feeling/${feeling2.id}`).send(data);

        //  C4 爆炸的味道 score should updated to 87
        let result = await Feeling.findById(feeling2.id);
        result.score.should.be.equal("87");

        // scent C4 , feelings should have {key:爆炸的味道, value: 87}
        result = await Scent.findOne({
          where: {
            name: feeling2.scentName
          }
        });

        result.feelings[0].key.should.be.equal("爆炸的味道");
        result.feelings[0].value.should.be.equal("87");

        done();
      } catch(e) {
        done(e);
      }
    });

    it('delete a Feeling title 木質, scentName BU2.', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .delete(`/api/admin/labfnp/feeling/${feeling.id}`);

        sails.log.info(JSON.stringify(res.body, null, 2));
        res.status.should.be.eq(200);
        res.body.should.be.Object;

        // Scent BU2, should remove {key:木質, value: 7}
        let result = await Scent.findOne({
          where: {
            name: feeling.scentName
          }
        });

        result = result.feelings;
        result = result.filter(function(value,index){
          return value.key === "木質";
        });

        result.length.should.be.equal(0);

        done();
      } catch (e) {
        done(e);
      }
    });

  });

});
