var sinon = require('sinon');

module.exports = {
  mockAdmin: async () => {
    try {
      let admin = await User.findOne({
        where: {
          username: 'admin',
        }
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
