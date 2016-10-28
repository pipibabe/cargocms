module.exports = {

  // 'get /api/admin/labfnp/recipe/export': 'api/admin/labfnp/RecipeController.export',

  'get /product/group/:groupId/page/:page':    'jason/ProductController.index',
  'get           /product/show/:productId':    'jason/ProductController.show',
  'get    /part/group/:groupId/page/:page':    'jason/PartController.index',
  'get                 /part/show/:partId':    'jason/PartController.show',
  'get /performance/group/:groupId/page/:page':'jason/PerformanceController.index',
  'get   /performance/show/:performanceId':    'jason/PerformanceController.show',
  'get                             /issue':      { view: 'jason/issue' },
  'get                           /contact':    'jason/ContactController.index',

  // api
  'post /api/contact':  'api/ContactController.create',

  'get /api/admin/jason/product':        'api/admin/jason/ProductController.find',
  'get /api/admin/jason/product/:id':    'api/admin/jason/ProductController.findOne',
  'post /api/admin/jason/product':      'api/admin/jason/ProductController.create',
  'put /api/admin/jason/product/:id':    'api/admin/jason/ProductController.update',
  'delete /api/admin/jason/product/:id': 'api/admin/jason/ProductController.destroy',

  'get /api/admin/jason/part':        'api/admin/jason/PartController.find',
  'get /api/admin/jason/part/:id':    'api/admin/jason/PartController.findOne',
  'post /api/admin/jason/part':       'api/admin/jason/PartController.create',
  'put /api/admin/jason/part/:id':    'api/admin/jason/PartController.update',
  'delete /api/admin/jason/part/:id': 'api/admin/jason/PartController.destroy',

  'get /api/admin/jason/performance':        'api/admin/jason/PerformanceController.find',
  'get /api/admin/jason/performance/:id':    'api/admin/jason/PerformanceController.findOne',
  'post /api/admin/jason/performance':       'api/admin/jason/PerformanceController.create',
  'put /api/admin/jason/performance/:id':    'api/admin/jason/PerformanceController.update',
  'delete /api/admin/jason/performance/:id': 'api/admin/jason/PerformanceController.destroy',

  'get /api/admin/jason/group/select/:group':  'api/admin/jason/GroupController.selectfind',

  'get /api/admin/jason/group':         'api/admin/jason/GroupController.find',
  'get /api/admin/jason/group/:id':     'api/admin/jason/GroupController.findOne',
  'post /api/admin/jason/group':        'api/admin/jason/GroupController.create',
  'put /api/admin/jason/group/:id':     'api/admin/jason/GroupController.update',
  'delete /api/admin/jason/group/:id':  'api/admin/jason/GroupController.destroy',

  // 'post /api/contact':       'api/ContactController.create',
  'get /api/admin/contact':        'api/admin/ContactController.find',
  'get /api/admin/contact/:id':    'api/admin/ContactController.findOne',
  // 'post /api/admin/contact':       'api/admin/ContactController.create',
  // 'put /api/admin/contact/:id':    'api/admin/ContactController.update',
  'delete /api/admin/contact/:id': 'api/admin/ContactController.destroy',

  "/jason/:controller/:action/:id?": {}
};
