/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  '/api/admin/mock': "admin/MockController.find",
  '/api/labfnp/scent': 'labfnp/ScentController.index',
  'get /api/labfnp/scent/simpleList': 'labfnp/ScentController.find',

  'get /api/labfnp/recipe': 'labfnp/RecipeController.find',
  'post /api/labfnp/recipe': 'labfnp/RecipeController.create',
  'get /api/labfnp/recipe/:id': 'labfnp/RecipeController.findOne',
  'put /api/labfnp/recipe/:id': 'labfnp/RecipeController.update',
  'delete /api/labfnp/recipe/:id': 'labfnp/RecipeController.destroy',

  'get /api/labfnp/scent': 'labfnp/ScentController.find',

  'get /api/labfnp/scentnote': 'labfnp/ScentNoteController.find',

  '/': {
    view: 'index'
  },

  '/api/admin/mock': "admin/MockController.find",

  '/api/labfnp/scent': 'api/labfnp/ScentController.index',
  'get /api/labfnp/scent/simpleList': 'api/labfnp/ScentController.find',

  'get /api/labfnp/recipe': 'api/labfnp/RecipeController.find',
  'post /api/labfnp/recipe': 'api/labfnp/RecipeController.create',
  'get /api/labfnp/recipe/:id': 'api/labfnp/RecipeController.findOne',
  'put /api/labfnp/recipe/:id': 'api/labfnp/RecipeController.update',
  'delete /api/labfnp/recipe/:id': 'api/labfnp/RecipeController.destroy',

  '/creator':     'labfnp/MainController.creator',
  '/lab':         'labfnp/MainController.explore',
  '/recipe/:id':  'labfnp/MainController.recipe',
  '/me/:id':      'labfnp/MainController.portfolio',

  //----- AuthController -----
  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback',

  //----- UserController -----
  'get /api/user': 'UserController.find',
  'get /api/user/:id': 'UserController.findOne',

  'post /api/user': 'UserController.create',
  'put /api/user/:id': 'UserController.update',
  'delete /api/user/:id': 'UserController.destroy',


  //----- PostController -----
  'get /api/post': 'PostController.find',
  'get /api/post/:id': 'PostController.findOne',

  'post /api/post': 'PostController.create',
  'put /api/post/:id': 'PostController.update',
  'delete /api/post/:id': 'PostController.destroy',

  //----- ImageController -----
  'post /api/upload': 'ImageController.upload',
  'delete /api/upload/:id': 'ImageController.destroy',

  '/admin/config.js': "AdminController.config",

  "/api/:controller/:action/:id?": {},
  "/labfnp/:controller/:action/:id?": {},
  "/admin/:controller/:action/:id?": {},
  "/:controller/:action/:id?": {},

  '/admin': 'AdminController.index',

  //----- SloganController -----
  'get /api/slogan': 'SloganController.find',
  'get /api/slogan/:id': 'SloganController.findOne',

  'post /api/slogan': 'SloganController.create',
  'put /api/slogan/:id': 'SloganController.update',
  'delete /api/slogan/:id': 'SloganController.destroy',




  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
