const fs = require('fs');

module.exports = {

  index: function(req, res) {
    // if not login
    res.redirect('/ship/login');
  },

  login: function(req, res) {
    const path = `assets-ship/login.html`;
    res.send(fs.readFileSync(path).toString());
  },

};
