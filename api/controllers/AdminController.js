/**
 * Authentication Controller
#
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
const url = require('url');

module.exports = {

  index: function(req, res) {
    let loginUser = null;
    let displayName = '未登入';
    let avatar = '/assets/admin/img/avatars/default.png';
    loginUser = AuthService.getSessionUser(req);

    if(loginUser != null){
      avatar = loginUser.avatar
      displayName = loginUser.displayName
    }

    MenuItem.findAllWithSubMenu().then((menuItems) => {
      res.ok({
        view: true,
        menuItems, loginUser, avatar, displayName
      });

    });
  },

  login: function(req, res) {
    res.ok({view: true});
  },

  dashboard: function(req, res) {
    res.ok({view: true});
  },

  config: function(req, res) {
    let config = {
      title: 'CargoCMS 雲端管理系統',
      copyright: '© Laboratory of Fragrance &amp; Perfume',
    };

    res.set('Content-Type', 'text/javascript');
    res.send(new Buffer('var __ADMIN_CONFIG__='+JSON.stringify(config)+';'));
  },

};
