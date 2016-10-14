module.exports = {

  // 'get /api/admin/labfnp/recipe/export': 'api/admin/labfnp/RecipeController.export',

  'get /product/group/:groupId/page/:page':    'jason/ProductController.index',
  'get /part':       'jason/PartController.index',
  'get /issue':      { view: 'jason/issue' },
  'get /contact':    'jason/ContactController.index',

  "/jason/:controller/:action/:id?": {}
};
