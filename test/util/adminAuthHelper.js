var sinon = require('sinon');

module.exports = {
  mockAdmin: async () => {
    try {
      let adminRole = await Role.findOrCreate({
        where: {authority: 'admin'},
        defaults: {authority: 'admin'}
      });
      let adminUsers = await User.findOrCreate({
        where: {
          username: 'admin'
        },
        defaults: {
          username: 'admin',
          email: 'admin@example.com',
          firstName: '李仁',
          lastName: '管'
        }
      })
      let passport = await Passport.findOrCreate({
        where: {
          provider: 'local',
          UserId: adminUsers[0].id
        },
        defaults: {
          provider: 'local',
          password: 'admin',
          UserId: adminUsers[0].id
        }
      });
      await adminUsers[0].addRole(adminRole[0]);
      let admin = await User.findOne({
        where: {
          id: adminUsers[0].id
        },
        include: [Role],
      });
      sinon.stub(AuthService, 'getSessionUser', (req) => {
        return admin.toJSON();
      });
    } catch (e) {
      throw e;
    }
  },

  unMockAdmin: async () => {
    try {
      AuthService.getSessionUser.restore();
    } catch (e) {
      throw e;
    }
  }
}
