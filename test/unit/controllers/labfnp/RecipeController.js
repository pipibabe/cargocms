var sinon = require('sinon');
describe('about LikeRecipe Controller operation.', function() {

  let recipe;
  before(async (done) => {
    try {
      let user = await User.create({
        username: 'likeRecipeUserController',
        email: 'likeRecipeUserController@gmail.com',
        password: ''
      });
      sinon.stub(AuthService, 'getSessionUser', (req) => {
        return user.toJSON();
      });
      recipe = await Recipe.create({
        formula:[
          {"drops":"1","scent":"BA69","color":"#E87728"},
          {"drops":"2","scent":"BA70","color":"#B35721"}
        ],
        formulaLogs: '',
        authorName: '王大明',
        perfumeName: 'love test',
        message: 'this is love test',
        UserId: user.id,
      });
      done()
    } catch (e) {
      done(e)
    }
  });

  after((done) => {
    AuthService.getSessionUser.restore();
    done();
  });

  it('Recipe like action should be success.', async (done) => {
    try {
      const res = await request(sails.hooks.http.app)
      .get(`/api/labfnp/recipe/like/${recipe.id}`)
      res.status.should.be.eq(200);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('Recipe unlike should be success.', async (done) => {
    try {
      const res = await request(sails.hooks.http.app)
      .get(`/api/labfnp/recipe/unlike/${recipe.id}`)
      res.status.should.be.eq(200);
      done();
    } catch (e) {
      done(e);
    }
  });



});
