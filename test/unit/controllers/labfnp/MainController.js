describe.skip('about labfnp Main Controller operation.', function() {

  it('labfnp Main Controller explore action filter user should be success.', async (done) => {
    try {
      const res = await request(sails.hooks.http.app)
      .get(`/explore?userId=:id`)
      done();
    } catch (e) {
      done(e);
    }
  });
});
