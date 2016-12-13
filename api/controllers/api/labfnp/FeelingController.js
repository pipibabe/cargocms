module.exports = {

  findByUser: async (req, res) => {
    try {
      let user = AuthService.getSessionUser(req);
      let scentItem =  [];
      let recipeItem = [];
      if (user) {
        scentItem = await RecipeService.getUserFeeling({ userId: user.id });
        recipeItem = await RecipeService.getUserRecipeFeeling({ userId: user.id });
      }
      let message = 'find user feeling';
      res.ok({message, data: {scentItem, recipeItem}});
    } catch (e) {
      res.serverError(e);
    }
  },
}
