import jwt from 'jsonwebtoken';
module.exports = {

  isAuthenticated: function(req) {
    if (req.session.authenticated) {
      return true;
    } else {
      return false;
    }
  },

  getSessionUser: function(req) {
    if (req.session.passport != undefined && req.session.passport.user) {
      return req.session.passport.user;
    } else {
      return null;
    }
  },

  isAdmin: function(req) {

    let user = AuthService.getSessionUser(req);
    let isAdmin = false;
    if (user) {
      user.Roles.forEach((role) => {
        if(role.authority == 'admin') isAdmin = true;
      });
    }

    return isAdmin;
  },

  getSessionEncodeToJWT: function(req) {
    const session = AuthService.getSessionUser(req);
    const isWebView = AuthService.isWebView(req.headers['user-agent']);
    let jwtToken = '';
    if ((req.session.needJwt || isWebView ) && session ) {
      jwtToken = jwt.sign(session, 'secret');
    }
    req.session.needJwt = false;
    return jwtToken;
  },

  isWebView: function(userAgent) {
    return userAgent.indexOf('React-Native') !== -1;
  }
}
