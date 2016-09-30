module.exports = {

  explore: async function(req, res) {
    try {
      const { userId } = req.query;
      const currentUser = AuthService.getSessionUser(req);

      const recipes = await Recipe.findAndIncludeUserLike({
        findByUserId: userId,
        currentUser,
        start: 0,
        length: 100,
      });

      let social = SocialService.forRecipe({recipes});

      return res.view({recipes, social});
    }
    catch (e) {
      res.serverError(e);
    }
  },

  editPofile: async function(req, res) {
    let user = null;
    let isMe = false;
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);
      if (!loginUser) return res.redirect('/login');

      const user = await User.findOneWithPassport({ id: loginUser.id });

      return res.view({
        user: user,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  portfolio: async function(req, res) {
    let user = null;
    let isMe = false;
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);

      let score = 0;
      if (id) {
        user = await User.findOne({where:{ id }});
        if(!user) return res.notFound("查無使用者");
        score = user.score;
      } else {
        user = loginUser
        if(!user) return res.redirect("/login");

        user = await User.findById(loginUser.id);
        const userRecipes = await Recipe.findAll({where: { UserId: user.id }});
        const userRecipesIds = userRecipes.map((recipe) => recipe.id);
        score = await UserLikeRecipe.count({where: { RecipeId: userRecipesIds }});
        user.score = score;
        await user.save();
      }
      isMe = (loginUser && (loginUser.id == user.id));

      let notShowPrivateRecipe = {};
      if(!isMe) notShowPrivateRecipe = { visibility: { $not: 'PRIVATE' } };

      const recipes = await Recipe.findAll({
        where: {
          UserId: user.id,
          ...notShowPrivateRecipe
        },
        order: 'Recipe.updatedAt desc',
        include: Image,
      })

      const followers = await Follow.count({ where: { following: user.id }});
      const favorited = await UserLikeRecipe.count({where: { UserId: user.id }});
      const following = await Follow.count({ where: { follower: user.id }});
      let isFollowing = false;
      if(loginUser) {
        isFollowing  = await Follow.findOne({
          where: {
            follower: loginUser.id,
            following: user.id,
          }
        });
      }

      return res.view({
        user, recipes, followers, favorited, following, isMe, score,
        isFollowing: !!isFollowing,
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },

  portfolioLike: async function(req, res) {
    let user = null;
    let isMe = false;
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);

      let score = 0;
      if (id) {
        user = await User.findOne({where:{ id }});
        if(!user) return res.notFound("查無使用者");
        score = user.score;
      } else {
        user = loginUser
        if(!user) return res.redirect("/login");

        user = await User.findById(loginUser.id);
        const userRecipes = await Recipe.findAll({where: { UserId: user.id }});
        const userRecipesIds = userRecipes.map((recipe) => recipe.id);
        score = await UserLikeRecipe.count({where: { RecipeId: userRecipesIds }});
        user.score = score;
        await user.save();
      }
      isMe = (loginUser && (loginUser.id == user.id));

      let notShowPrivateRecipe = {};
      if(!isMe) notShowPrivateRecipe = { visibility: { $not: 'PRIVATE' } };

      const followers = await Follow.count({ where: { following: user.id }});
      const favorited = await UserLikeRecipe.count({where: { UserId: user.id }});
      const following = await Follow.count({ where: { follower: user.id }});
      let isFollowing = false;
      if(loginUser) {
        isFollowing  = await Follow.findOne({
          where: {
            follower: loginUser.id,
            following: user.id,
          }
        });
      }

      const likedRecipes = await Recipe.findAll({
        where: {
          ...notShowPrivateRecipe
        },
        order: 'Recipe.updatedAt desc',
        include: [
          Image,
          {
            model: UserLikeRecipe,
            where: {
              UserId: user.id
            }
          },
        ],
      })

      return res.view({
        user, recipes: likedRecipes, followers, favorited, following, isMe, score,
        isFollowing: !!isFollowing,
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },
}
