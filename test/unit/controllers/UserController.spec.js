import {mockAdmin, unMockAdmin} from "../../util/adminAuthHelper.js"

describe('about User Controller operation.', function() {

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

  it('create User should success.', async (done) => {
    const createThisUser = {
      username: 'xxxx',
      email: 'xxx@xxx.xxx',
      firstName: 'test',
      lastName: 'test',
      locale: 'zh_TW',
      Passports: [{ password: '000000' }],
    };
    try {
      const res = await request(sails.hooks.http.app)
      .post(`/api/admin/user`)
      .send(createThisUser);
      sails.log.info('create user controller spec =>', res.body);
      res.body.should.be.Object;
      res.body.data.email.should.be.equal(createThisUser.email);
      res.body.data.locale.should.be.equal('zh_TW');
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('find all users', () => {
    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app).get(`/api/admin/user`);
        sails.log.info('find users controller spec =>', res.body);
        res.body.data.should.be.Array;
        res.body.success.should.be.equal(true);
        res.body.data.items.length.should.be.above(0);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('find one user', () => {
    let findThisUser;
    before(async (done) => {
      try {
        findThisUser = await User.create({
          username: `testfindController`,
          email: `testfindController@gmail.com`,
          firstName: 'test',
          lastName: 'findController'
        });
        let passport = await Passport.create({provider: 'local', password: 'user', UserId: findThisUser.id});
        sails.log.info('findThisUser.data.id=>', findThisUser.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .get(`/api/admin/user/${findThisUser.id}`);
        sails.log.info('find one user controller spec =>', res.body);
        res.body.data.should.be.Object;
        res.body.data.id.should.be.Number;
        res.body.data.id.should.be.equal(findThisUser.id);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('delete user', () => {
    let deleteThisUser;
    before(async (done) => {
      try {
        deleteThisUser = await User.create({
          username: `testDeleteController`,
          email: `testDeleteController@gmail.com`,
          firstName: 'test',
          lastName: 'DeleteController'
        });
        let passport = await Passport.create({provider: 'local', password: 'user', UserId: deleteThisUser.id});
        sails.log.info('deleteThisUser.id=>', deleteThisUser.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .delete(`/api/admin/user/${deleteThisUser.id}`);
        sails.log.info('delete user controller spec =>', res.body);
        res.body.success.should.be.true;
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('update user', () => {
    let updateThisUser;
    const updatedUser = {
      username: 'updated',
      email: 'update@update.update',
      firstName: 'Kent',
      lastName: 'Chen',
      locale: 'hk',
      Passports: [{ password: '000000' }],
      Roles: [ "admin", "user" ]
    };
    let originPassport;
    before(async (done) => {
      try {
        updateThisUser = await User.create({
          username: 'updateThisUser',
          email: 'updateThisUser@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        originPassport = await Passport.create({provider: 'local', password: '123123', UserId: updateThisUser.id});
        sails.log.info('updateThisUser.data.id=>', updateThisUser.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/user/${updateThisUser.id}`)
        .send(updatedUser);
        res.status.should.eq(200);
        res.body.data.locale.should.be.equal('hk');
        res.body.data.username.should.be.equal('updated');
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
