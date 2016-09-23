/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  console.log("req.session.authenticated", req.session.authenticated);
  if (sails.config.offAuth || req.session.authenticated) {
    // const user = AuthService.getSessionUser(req);
    // const noEmail = !user.email;
    // if (noEmail || user.email === '') {
    //   return res.redirect('/edit/me');
    // }
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
