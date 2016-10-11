describe('about Recipe Order Controller operation.', function() {
  let recipe, recipeOrder;
  before(async(done) => {
    try {
      const user = await User.create({
        username: 'testRecipeOrder',
        email: 'testRecipeOrder@example.com',
        firstName: '大明',
        lastName: '王'
      })
      recipe = await Recipe.create({
        formula:[
          {"drops":"1","scent":"BA69","color":"#E87728"},
          {"drops":"2","scent":"BA70","color":"#B35721"}
        ],
        formulaLogs: '',
        authorName: '王大明',
        perfumeName: 'love',
        description: 'this is love',
        message: '備註',
      });
      recipeOrder = await RecipeOrder.create({
        recipient: 'AAA',
        address: 'Taiwan',
        phone: '0953999999',
        email: 'da@gmail.com',
        note: '456',
        remark: '456',
        UserId: user.id,
        RecipeId: recipe.id,
      });
      await Allpay.create({
        MerchantTradeNo: 'sdkfsldfjkl231sdf',
        RecipeOrderId: recipeOrder.id,
        ShouldTradeAmt: 22000
      });

      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

  it.only('update Production Status', async (done) => {
    try {
      const data = {
        productionStatus: 'PAID'
      };
      const res = await request(sails.hooks.http.app)
      .put(`/api/admin/labfnp/recipeorder/status/${recipeOrder.id}`).send(data);
      console.log(res.body);
      const check = await RecipeOrder.findById(recipeOrder.id);
      check.productionStatus.should.be.eq(data.productionStatus);
      done();
    } catch (e) {
      done(e);
    }
  });
});
