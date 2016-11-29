/**
 * Authentication Controller
#
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
const url = require('url');
module.exports = {
  login: function(req, res) {
    try{
      if(req.session.authenticated) return res.redirect('/');
      let user = {
        identifier: '',
        password: ''
      }
      let form = req.flash('form')[0];
      if(form) user = form;

      let url = req.query.url || '/';

      res.ok({
        //layout: false,
        user,
        errors: req.flash('error')[0],
        url
      });
    } catch (e){
      sails.log.error(e);
      res.serverError(e);
    }
  },
  logout: function(req, res) {
    req.session.authenticated = false;
    req.logout();
    return res.redirect(req.query.url || sails.config.urls.afterLogout);

  },
  provider: function(req, res) {
    try {
      passport.endpoint(req, res);
    } catch (e) {
      sails.log.error(e);
    }
  },
  register: async (req, res) => {
    if(req.session.authenticated) return res.redirect('/');
    try {
      let user = {
        username: '',
        email: '',
        lastName: '',
        firstName: '',
        birthday: '',
        phone1: '',
        phone2: '',
        address: '',
        address2: ''
      }
      let form = req.flash('form')[0];
      if(form) user = form;

      res.ok({
        user,
        errors: req.flash('error'),
        reCAPTCHAKey: sails.config.reCAPTCHA.key
      });
    } catch (e) {
      res.serverError(e);
    }
  },
  status: (req, res) => {
    let authenticated = AuthService.isAuthenticated(req)
    let sessionUser = AuthService.getSessionUser(req)

    res.ok({authenticated, sessionUser});

  },
  callback: async function(req, res) {

    var tryAgain = function(err) {

      var action, flashError;
      flashError = req.flash('error')[0];
      if (err && !flashError) {
        req.flash('error', 'Error.Passport.Generic');
      } else if (flashError) {
        req.flash('error', flashError);
      }
      req.flash('form', req.body);
      action = req.param('action');
      switch (action) {
        case 'register':
          res.redirect('/register');
          break;
        case 'disconnect':
          res.redirect('back');
          break;
        default:
          var reference;
          try {
            reference = url.parse(req.headers.referer);
          } catch (e) {

            reference = { path : "/" };
          }

          res.redirect(reference.path);
      }
    };

    await passport.callback(req, res, function(err, user, challenges, statuses) {
      console.info('=== callback user ===', user);
      console.info('=== passport.callback ===', err);

      if (err || !user) {
        return tryAgain(err);
      }

      req.login(user, function(err) {
        if (err) {
          return tryAgain(err);
        }

        req.session.authenticated = true;

        // update user lastLogin status
        const userAgent = req.headers['user-agent'];
        user.loginSuccess({ userAgent });

        let action = req.param('action');
        if (action === 'register' && sails.config.verificationEmail) {
          req.flash('info', '註冊成功!! 接下來補齊您的資料，並於信箱查收驗證信');
          return res.redirect('/edit/me');
        }

        let url = req.query.url;
        if (!url && req.body) url = req.body.url;
        url = url || sails.config.urls.afterSignIn;
        return res.redirect(url);
      });
    });
  },

  disconnect: function(req, res) {
    passport.disconnect(req, res);
  },

  forgot: function(req, res) {
    try {
      res.ok({ view: true, reCAPTCHAKey: sails.config.reCAPTCHA.key });
    } catch (e) {
      res.serverError(e);
    }
  }

};
