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
      return res.view({
        recipes: await Recipe.findAll()
      });
    }
    catch (e) {
      console.log(e);
      res.serverError(e);
    }
  },

  recipe: async function(req, res) {
    const { id } = req.params;

    try {
      return res.view({
        recipe: await Recipe.findById(id)
      });
    }
    catch (e) {
      console.log(e);
      res.serverError(e);
    }
  },

  portfolio: async function(req, res) {

    let user = await User.findById(req.params.id);

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
