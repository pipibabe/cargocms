module.exports = {

  findForLab: async (req, res) => {
    console.log("=== findForLab ===");
    try {
      let user = AuthService.getSessionUser(req);
      const recipes = await Recipe.findAndIncludeUserLike({
        currentUser: user,
        start: parseInt(req.query.start, 10) || 0,
        length: parseInt(req.query.length, 10) || 5,
        likeUser: req.query.type === 'like' ? user : null,
      });
      console.log();
      let social = SocialService.forRecipe({recipes});
      res.ok({
        data: {
          items: recipes,
          social,
        }
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  findOne: async (req, res) => {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      const isAdmin = AuthService.isAdmin(req);
      let { recipe } =  await RecipeService.loadRecipe(id, currentUser, isAdmin);
      sails.log.info('get recipe =>', recipe);
      res.ok({
        message: 'Get recipe success.',
        data: {item: recipe},
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    const data = req.body;
    try {
      const loginedUser = AuthService.getSessionUser(req);
      if (loginedUser) {
        data.UserId = loginedUser.id;
      }
      sails.log.info('create recipe controller=>', data);
      const recipe = await RecipeService.create(data);
      await RecipeService.createUserFeeling({
        formula: data.formula,
        userId: loginedUser.id
      });

      if (data.feedback && data.feedback.length > 0) {
        await RecipeFeedback.create({
          feeling: data.feedback,
          UserId: loginedUser.id,
          RecipeId: recipe.id,
        });
      }
      req.flash('info', 'Info.New.Recipe');
      res.ok({
        message: 'Create recipe success.',
        data: recipe,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      sails.log.info('update recipe controller id=>', id);
      sails.log.info('update recipe controller data=>', data);
      const user = AuthService.getSessionUser(req);

      const recipe = await RecipeService.update({
        id: id,
        ...data,
      });

      await RecipeFeedback.update({
        feeling: data.feedback
      },{
        where: { UserId: user.id, RecipeId: id }
      });

      await RecipeService.updateUserFeeling({
        formula: data.formula,
        userId: user.id,
      });

      res.ok({
        message: 'Update recipe success.',
        data: recipe,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      sails.log.info('delete recipe controller=>', id);
      const userId = AuthService.getSessionUser(req).id;
      const recipe = await Recipe.deleteById(id);
      res.ok({
        message: 'Delete recipe success.',
        data: {
          userId
        },

      });
    } catch (e) {
      res.serverError(e);
    }
  },

  like: async(req, res) => {
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);
      if (!loginUser) throw Error('permission denied');
      const recipe = await Recipe.findById(id);
      await UserLikeRecipe.createIfNotExist({RecipeId: id, UserId: loginUser.id})

      res.ok({
        message: 'success like recipe',
        data: true,
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  unlike: async (req, res) => {
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);
      if (!loginUser) throw Error('permission denied');

      const recipe = await Recipe.findById(id);
      await UserLikeRecipe.destroy({
        where: {RecipeId: id, UserId: loginUser.id}
      })
      res.ok({
        message: 'success dislike recipe',
        data: true,
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  feelings: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("=== id ===", id);

      const feelings = await Recipe.getFeelings({id});

      res.ok({
        message: 'success get recipe\'s feelings',
        data: {feelings},
      });

    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  topNew: async (req, res) => {
    try {
      const recipes = await Recipe.findAll({
        where: { visibility: { $not: 'PRIVATE' } },
        offset: 0,
        limit: 5,
        order: [['createdAt', 'DESC']],
      });
      res.ok({
        message: 'success get new recipe',
        data: { recipes },
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  saveFeedback: async (req, res) => {
    const data = req.body;
    try {
      if(data.feeling !== ""){
        data.feeling = data.feeling.split(',');
        let {UserId, RecipeId} = data;
        let feedback = await RecipeFeedback.findOne({where: {UserId, RecipeId}});

        if(feedback != null){
          feedback.invoiceNo = data.invoiceNo;
          feedback.tradeNo = data.tradeNo;
          feedback.feeling = data.feeling;
          feedback = await feedback.save(data);
        }else {
          feedback = await RecipeFeedback.create(data);
        }
      }

      let updateformula = [];
      if(data.scentFeeling){
        Object.keys(data.scentFeeling).forEach(function (key) {
          if (data.scentFeeling[key]) {
            let feeling = data.scentFeeling[key].split(',') ;
            updateformula.push({
              scent: key,
              userFeeling: feeling,
            })
          } else {
            updateformula.push({
              scent: key,
              userFeeling: [],
            })
          }
        });
        const user = AuthService.getSessionUser(req);
        await RecipeService.updateUserFeeling({
          formula: updateformula,
          userId: user ? user.id : null,
        });
      }

      res.ok({
        message: 'save feedback success.',
        data: true,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

}
