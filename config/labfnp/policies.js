module.exports = {
  'api/labfnp/RecipeOrderController': {
    'find': ['passport', 'sessionAuth'],
  },
  'api/labfnp/RecipeController': {
    create: ['passport', 'sessionAuth'],
    update: ['passport', 'sessionAuth'],
    destroy: ['passport', 'sessionAuth'],
  },
  'labfnp/RecipeController': {
    'create': ['passport', 'sessionAuth', 'jwtEncode'],
    'order': ['passport', 'sessionAuth'],
    'feedback': ['passport', 'sessionAuth'],
    'allpay': ['passport', 'sessionAuth'],
    'done': ['passport', 'sessionAuth'],
    'show': ['nocache', 'passport'],
  },
  'labfnp/MainController': {
    'explore': ['nocache', 'passport'],
    'portfolio': ['nocache'],
    'editPofile': ['nocache'],
    'validateEmail': [],
  },
  'api/admin/labfnp/RecipeController': {
    'find': ['passport', 'sessionAuth', 'isAdmin'],
    'findOne': ['passport', 'sessionAuth', 'isAdmin'],
    'create': ['passport', 'sessionAuth', 'isAdmin'],
    'update': ['passport', 'sessionAuth', 'isAdmin'],
    'destroy': ['passport', 'sessionAuth', 'isAdmin'],
  },
  'api/admin/labfnp/FeelingController': {
    '*': ['passport', 'sessionAuth', 'isAdmin'],
  }
}
