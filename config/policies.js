/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */
import customConfigLoader from './util/customConfigLoader.js';
var customConfig = customConfigLoader('policies.js');

var defaultConfig = {
  '*': ['nocache', 'passport', 'sessionAuth'],
  'AuthController': {
    '*': ['passport'],
    'status': [],
  },
  ...customConfig,
  'BlogController': {
    'index': true
  },
  'WallController': true,
  'MainController': {
    'index': ['nocache', 'passport'],
    'portfolio': ['nocache', 'passport'],
  },
  'AdminController': {
    'index': ['passport', 'sessionAuth', 'isAdmin']
  },
  'api/UserController': {
    '*': ['passport', 'sessionAuth'],
    'forgotPassword': [],
    'updatePassword': [],
  },
  'EventController': {
    'allpay': ['passport', 'sessionAuth'],
  },
  'api/admin/DownloadController': {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  'api/admin/AllpayController': {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  "api/admin/AllpayController": {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  "api/admin/ContactController": {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  "api/admin/EventController": {
    'paid': [],
    'paymentinfo': [],
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  "api/admin/facebook/FeedController": {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  // user using admin's ImageController to upload image...
  "api/admin/ImageController": {
    'upload': ['passport', 'sessionAuth'],
    'destroy': ['passport', 'sessionAuth'],
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  "api/admin/MessageController": {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  "api/admin/MockController": {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  "api/admin/PostController": {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  "api/admin/SloganController": {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  "api/admin/UserController": {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  "UtilsController": {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },
  "api/admin/ProductDescriptionController": {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  },

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
  // RabbitController: {

    // Apply the `false` policy as the default for all of RabbitController's actions
    // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
    // '*': false,

    // For the action `nurture`, apply the 'isRabbitMother' policy
    // (this overrides `false` above)
    // nurture	: 'isRabbitMother',

    // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
    // before letting any users feed our rabbits
    // feed : ['isNiceToAnimals', 'hasRabbitFood']
  // }

}


module.exports.policies = {
  ...defaultConfig
};
