module.exports = {

  'get /api/labfnp/recipe/findForLab': 'api/labfnp/RecipeController.findForLab',
  'get /api/labfnp/recipe': 'api/labfnp/RecipeController.find',
  'post /api/labfnp/recipe': 'api/labfnp/RecipeController.create',
  'get /api/labfnp/recipe/new': 'api/labfnp/RecipeController.topNew',
  'get /api/labfnp/recipe/:id': 'api/labfnp/RecipeController.findOne',
  'put /api/labfnp/recipe/:id': 'api/labfnp/RecipeController.update',
  'delete /api/labfnp/recipe/:id': 'api/labfnp/RecipeController.destroy',

  'get /api/labfnp/recipe/:id/feelings': 'api/labfnp/RecipeController.feelings',

  'get /api/labfnp/user/feeling': 'api/labfnp/FeelingController.findByUser',
  'get /api/labfnp/feeling': 'api/labfnp/FeelingController.find',
  'get /api/labfnp/feeling/:id': 'api/labfnp/FeelingController.findOne',
  'post /api/labfnp/feeling': 'api/labfnp/FeelingController.create',
  'put /api/labfnp/feeling/:id': 'api/labfnp/FeelingController.update',
  'delete /api/labfnp/feeling/:id': 'api/labfnp/FeelingController.destroy',

  'get /api/labfnp/recipe/like/:id': 'api/labfnp/RecipeController.like',
  'get /api/labfnp/recipe/unlike/:id': 'api/labfnp/RecipeController.unlike',
  'post /api/labfnp/recipe/feedback': 'api/labfnp/RecipeController.saveFeedback',

  'get /api/labfnp/order': 'api/labfnp/RecipeOrderController.find',
  'get /api/labfnp/eventOrder': 'api/labfnp/EventOrderController.find',

  'get /api/labfnp/scent/simpleList': 'api/labfnp/ScentController.find',
  'get /api/labfnp/scent': 'api/labfnp/ScentController.find',
  'get /api/labfnp/scentnote': 'api/labfnp/ScentNoteController.find',

  'get /api/admin/labfnp/scentfeedback': 'api/admin/labfnp/ScentFeedbackController.find',
  'get /api/admin/labfnp/scentfeedback/:id': 'api/admin/labfnp/ScentFeedbackController.findOne',
  'delete /api/admin/labfnp/scentfeedback/:id': 'api/admin/labfnp/ScentFeedbackController.destroy',
  'put /api/admin/labfnp/feedbackCheck/:id': 'api/admin/labfnp/ScentFeedbackController.feedbackCheck',

  // 這裡先相容舊版 api
  'post /api/allpay/paid':        'api/admin/labfnp/RecipeController.paid',
  'post /api/allpay/paymentinfo': 'api/admin/labfnp/RecipeController.paymentinfo',
  //
  'post /api/recipe/paid':        'api/admin/labfnp/RecipeController.paid',
  'post /api/recipe/paymentinfo': 'api/admin/labfnp/RecipeController.paymentinfo',
  'get /api/admin/labfnp/recipe/export': 'api/admin/labfnp/RecipeController.export',

  'put /api/admin/shipping/:id': 'api/admin/labfnp/RecipeOrderController.shippingUpdate',
  'put /api/admin/labfnp/recipeorder/status/:id': 'api/admin/labfnp/RecipeOrderController.updateProductionStatus',

  '/recipe/done':     'labfnp/RecipeController.done',
  '/recipe/:id':      'labfnp/RecipeController.show',
  // '/recipe/preview/:id': 'labfnp/RecipeController.preview',
  '/recipe/order/:id': 'labfnp/RecipeController.order',
  '/recipe/feedback/:id': 'labfnp/RecipeController.feedback',
  '/recipe/edit/:id': 'labfnp/RecipeController.edit',
  '/recipe/allpay/:id':  'labfnp/RecipeController.allpay',
  '/creator':         'labfnp/RecipeController.create',
  '/lab':             'labfnp/MainController.explore',
  '/me/:id?':         'labfnp/MainController.portfolio',
  '/edit/me':         'labfnp/MainController.editPofile',
  '/update/password': 'labfnp/MainController.updatePassword',
  '/validate/email':  'labfnp/MainController.validateEmail',

  "/labfnp/:controller/:action/:id?": {}
};
