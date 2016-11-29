module.exports = {
  getShareUrl: function() {
    return sails.config.appUrl;
  },


  forRecipe: ({recipes}) => {
    try {
      let socialsConfig = sails.config.socials

      const socialData = recipes.map((recipe) => {
        const {id, hashId, description} = recipe;
        const title = recipe.perfumeName;
        const recipeId = hashId || id
        const url = SocialService.getShareUrl() + '/recipe/' + recipeId
        return {
          description, title, url
        }
      });

      let social = {
        data: socialData,
        targets: socialsConfig
      };
      return social;
    } catch (e) {
      throw e;
    }
  },

  forPost: ({posts}) => {
    try {
      let socialsConfig = sails.config.socials

      const socialData = posts.map((post) => {
        const {id, title} = post;
        const description = "";
        const url = SocialService.getShareUrl() + '/blog/show/' + id
        return {
          description, title, url
        }
      });

      let social = {
        data: socialData,
        targets: socialsConfig
      };
      return social;
    } catch (e) {
      throw e;
    }
  }

}
