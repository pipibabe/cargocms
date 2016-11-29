/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  const user = AuthService.getSessionUser(req);
  console.log("req.session", user);
  if (sails.config.offAuth || user) {
    const noEmail = !user.email;
    if (noEmail || user.email === '') {
      sails.log.warn('使用者登入沒有 Email');
      req.flash('info', '請補齊 Email 資料');
      return res.redirect('/edit/me');
    }

    if (sails.config.verificationEmail && user.verificationEmailToken) {
      const modelUser = await User.findById(user.id);
      if (modelUser.verificationEmailToken) {
        req.flash('info', '請先驗證完您的 Email 才能使用此功能');
        return res.redirect('/edit/me');
      }
    }

    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
