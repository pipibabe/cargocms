describe('test Recipe model operation', function() {

  it('create should be success.', async (done) => {
    try {
      let newLabfnpRecipe = {
        formula: [ 'B5:3', 'T14:3' ],
        formulaLogs: "+B4:3;+T14:2;-B4:3",
        authorName: '作者名',
        perfumeName: '香水配方名'
      }

      let createdLabfnpRecipe = await Recipe.create(newLabfnpRecipe);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('findOne should be success.', async (done) => {
    try {
      let perfumeName = '香水配方名';
      let createdLabfnpRecipe = await Recipe.findOne({where: {perfumeName}});

      done();
    } catch (e) {
      done(e);
    }
  });

  describe("find With Like User", () => {
    let recipeLoveTest, testUser, likeUser, testUser2;
    before(async (done) => {
      try {
        testUser = await User.create({
          username: 'testUser',
          email: 'testUser@gmail.com',
          password: ''
        });


        likeUser = await User.create({
          username: 'likeUser',
          email: 'likeUser@gmail.com',
          password: ''
        });
        let newRecipeLoveTest = {
          formula:[
            {"drops":"1","scent":"BA69","color":"#E87728"},
            {"drops":"2","scent":"BA70","color":"#B35721"}
          ],
          formulaLogs: '',
          authorName: '王大明',
          perfumeName: 'love test',
          message: 'this is love test',
          UserId: testUser.id,
        };

        recipeLoveTest = await Recipe.create(newRecipeLoveTest);


        await UserLikeRecipe.createIfNotExist({RecipeId: recipeLoveTest.id, UserId: likeUser.id})
        await UserLikeRecipe.createIfNotExist({RecipeId: recipeLoveTest.id, UserId: likeUser.id})
        await UserLikeRecipe.createIfNotExist({RecipeId: recipeLoveTest.id, UserId: testUser.id})

        // await likeUser.addUserLikeRecipes({RecipeId: recipeLoveTest.id})
        // await testUser.addUserLikeRecipes({RecipeId: recipeLoveTest.id})

        testUser2 = await User.create({
          username: 'testLikeUser',
          email: 'testLikeUser@gmail.com',
          password: ''
        });
        done()

      } catch (e) {
        done(e)
      }
    })
    it('find by likeUser should be success.', async (done) => {
      try {
        let user = likeUser;
        let result = await Recipe.findAndIncludeUserLike({user});
        console.log("=== result.length ===", result.length);
        done();
      } catch (e) {
        done(e);
      }
    });
    it('find by testUser should be success.', async (done) => {
      try {
        let user = testUser;
        let result = await Recipe.findAndIncludeUserLike({user});
        console.log("=== result.length ===", result.length);
        console.log(JSON.stringify(result, null, 2));
        done();
      } catch (e) {
        done(e);
      }
    });

    it.skip('should be success.', async (done) => {
      try {
        recipeLoveTest.addUser(testUser2.id, {as: 'LikeRecipes'});
        done()
      } catch (e) {
        done(e);
      }
    });

  })



});
