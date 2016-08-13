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
    console.log('>>> admin index >>>');

    res.ok({
      view: true,
      menuItems: [
        { icon: 'home', href: '/admin/dashboard', title: '控制台' },
        { icon: 'wrench', href: '#', title: '資料維護', subItems: [
          { href: '/admin/user', title: '會員資料' },
          { href: '/admin/post', title: '內容資料' },
          { href: '/admin/labfnp/recipe', title: '配方資料' },
          { href: '/admin/mock', title: '實驗室' },
          { href: '/admin/labfnp/scent', title: '香味分子' },
          { href: '/admin/labfnp/scentnote', title: '香調' },
          { href: '/admin/slogan', title: 'slogan'}
        ]},
      ],
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
