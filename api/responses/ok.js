/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */
 
import jwt from 'jsonwebtoken';
module.exports = function sendOK (data, options) {
  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;
  var url = req._parsedUrl;
  var path = url.path || "";
  var isAdminView = path.startsWith("/admin");

  sails.log.silly('res.ok() :: Sending 200 ("OK") response');

  // Set status code
  res.status(200);

  // If appropriate, serve data as JSON(P)
  if (req.wantsJSON && !data.view) {
    // data.controller = req.options.controller;
    // data.action = req.options.action;
    if (data) {
      data.success = true;
      if(!data.data)data.data = {};
      if(!data.message)data.message = "";
    }
    return res.jsonx(data);
  }

  // If second argument is a string, we take that to mean it refers to a view.
  // If it was omitted, use an empty object (`{}`)
  options = (typeof options === 'string') ? { view: options } : options || {};

  // If a view was provided in options, serve it.
  // Otherwise try to guess an appropriate view, or if that doesn't
  // work, just send JSON.

  // 指定 layout sample
  // res.ok({
  //   view: true,
  //   layout: 'layoutAdmin'
  // });

  // 如何關閉預設 layout 輸出？
  // res.ok({
  //   layout: false,
  // });

  var params = { data: data };

  if (isAdminView && !data.layout) {
    params.layout = false;
  }
  else if (data.layout !== null) {
    params.layout = data.layout;
  }

  if (options.view) {
    return res.view(options.view, params);
  } else if (options.redirect) {
    return res.redirect(options.redirect);
  }

  // If no second argument provided, try to serve the implied view,
  // but fall back to sending JSON(P) if no view can be inferred.
  else return res.guessView(params, function couldNotGuessView () {
    return res.jsonx(data);
  });
};
