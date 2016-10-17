module.exports = {
  index: function(req, res) {
    // let user = AuthService.getSessionUser(req);
    // in jade use `#{data.user} to access`
    // return res.ok({user})
    try {
      res.view('report/index');
    } catch (e) {
      res.serverError(e);
    }
  },
  knowtype: function(req, res) {
    let {type} = req.query;
    try {
      if (type === 'yes') {
        return res.view('report/yes');
      } else if (type === 'no') {
        return res.view('report/no');
      }
      res.view('report/index');
    } catch (e) {
      res.serverError(e);
    }
  },
  // 一般藥物通報
  generalStep1: function(req, res) {
    // let user = AuthService.getSessionUser(req);
    // in jade use `#{data.user} to access`
    // return res.ok({user})
    try {
      res.view('report/generalStep1');
    } catch (e) {
      res.serverError(e);
    }
  },
  generalStep2: function(req, res) {
    // let user = AuthService.getSessionUser(req);
    // in jade use `#{data.user} to access`
    // return res.ok({user})
    try {
      res.view('report/generalStep2');
    } catch (e) {
      res.serverError(e);
    }
  },
  generalStep3: function(req, res) {
    // let user = AuthService.getSessionUser(req);
    // in jade use `#{data.user} to access`
    // return res.ok({user})
    try {
      res.view('report/generalStep3');
    } catch (e) {
      res.serverError(e);
    }
  },
  generalStep4: function(req, res) {
    // let user = AuthService.getSessionUser(req);
    // in jade use `#{data.user} to access`
    // return res.ok({user})
    try {
      res.view('report/generalStep4');
    } catch (e) {
      res.serverError(e);
    }
  },
}
