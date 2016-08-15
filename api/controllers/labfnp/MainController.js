module.exports = {

  creator: async function(req, res) {
    try {
      let currentUser = AuthService.getSessionUser(req);

      if (!currentUser) {
        return res.redirect('/login');
      }

      return res.view({
        user: currentUser,
        scents: await Scent.findAllWithRelationFormatForApp()
      });
    }
    catch (e) {
      console.log(e);
      res.serverError(e);
    }
  },

  explore: async function(req, res) {
    try {
      let user = AuthService.getSessionUser(req);
      const recipes = await Recipe.findAndIncludeUserLike({user});

      return res.view({
        recipes: recipes
      });
    }
    catch (e) {
      console.log(e);
      res.serverError(e);
    }
  },

  recipe: async function(req, res) {
    const { id } = req.params;

    let recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.notFound();
    }

    try {
      return res.view({ recipe });
    }
    catch (e) {
      console.log(e);
      return res.serverError(e);
    }
  },

  portfolio: async function(req, res) {

    let user = null;

    if (req.params.id) {
      user = await User.findById(req.params.id);
    }
    else {
      user = AuthService.getSessionUser(req);
    }

    try {
      return res.view({
        user,
        recipes: await Recipe.findAll({
          where: { userId: user.id },
          order: 'updatedAt desc',
        })
      });
    }
    catch (e) {
      console.log(e);
      res.serverError(e);
    }
  },
}
