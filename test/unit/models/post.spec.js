describe('about Post model operation.', function() {
  it('create Post should success.', async (done) => {
    try {
      const image = await Image.create({
        filePath: 'http://www.labfnp.com/modules/core/img/update1.jpg',
        type: 'image/jpeg',
        storage: 'url',
      });

      const post = await Post.create({
        title: '香味的一沙一世界6',
        content: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材（ex:玫瑰、康乃馨..等)所組成的『這束花的味道』，接著抽出其中的一朵康乃馨',
        cover: image.id,
        url: 'http://localhost:5001/blog/flower',
        abstract: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材',
      })
      post.id.should.be.INTEGER;
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('about Post model operation.', function() {
    let post;
    let tag;
    let user;
    before(async (done) => {
      try {
        await Post.destroy({ where: { id: { $gt:0 } } });
        user = await User.create({
          username: 'postModelTest',
          email: 'postModelTest@gmail.com',
          firstName: '王',
          lastName: '大明'
        });
        const image = await Image.create({
          filePath: 'http://www.labfnp.com/modules/core/img/update1.jpg',
          type: 'image/jpeg',
          storage: 'url',
        });
        post = await Post.create({
          title: '香味的一沙一世界5',
          content: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材（ex:玫瑰、康乃馨..等)所組成的『這束花的味道』，接著抽出其中的一朵康乃馨',
          cover: image.id,
          url: 'http://localhost:5001/blog/flower',
          abstract: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材',
          UserId: user.id,
        })
        tag = await Tag.create({
          title: 'A'
        });
        await post.addTag(tag.id);
        done();
      } catch (e) {
        done(e)
      }
    });

    it('add Location to Post.', async (done) => {
      try {
        let location = await Location.create({
          longitude: 10,
          latitude: 10,
        });
        location.addPost(post.id);

        let checkPost = await Post.findById(post.id);
        checkPost.LocationId.should.be.eq(location.id)
        done();
      } catch (e) {
        done(e);
      }
    });


    it('find Post by id has join should success.', async (done) => {
      try {
        let result = await Post.findByIdHasJoin(post.id);
        result.id.should.be.eq(post.id)
        done();
      } catch (e) {
        done(e);
      }
    });
    it('find All Post by id has join should success.', async (done) => {
      try {
        let result = await Post.findAllHasJoin();
        result.length.should.be.not.eq(0);
        result[0].id.should.be.eq(post.id);
        result[0].User.id.should.be.eq(user.id)
        done();
      } catch (e) {
        done(e);
      }
    });
    it('create Post should success.', async (done) => {
      try {
        let result = await Post.findByTagId(tag.id);
        result[0].id.should.be.eq(post.id)
        done();
      } catch (e) {
        done(e);
      }
    });
    it('destroy Post should success.', async (done) => {
      try {
        const result = await Post.deleteById(post.id);
        result.should.be.eq(1);
        done()
      } catch (e) {
        done(e)
      }
    });
  });


  describe('about Post model operation.', function() {
    let post;
    let tag;
    let user;
    before(async (done) => {
      try {
        await Post.destroy({ where: { id: { $gt:0 } } });
        user = await User.create({
          username: 'postLocationModelTest',
          email: 'postLocationModelTest@gmail.com',
          firstName: '王',
          lastName: '大明'
        });
        const image = await Image.create({
          filePath: 'http://www.labfnp.com/modules/core/img/update1.jpg',
          type: 'image/jpeg',
          storage: 'url',
        });
        post = await Post.create({
          title: '香味的一沙一世界5',
          content: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材（ex:玫瑰、康乃馨..等)所組成的『這束花的味道』，接著抽出其中的一朵康乃馨',
          cover: image.id,
          url: 'http://localhost:5001/blog/flower',
          abstract: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材',
          UserId: user.id,
        })
        tag = await Tag.create({
          title: 'A'
        });
        await post.addTag(tag.id);
        let location = await Location.create({
          longitude: 10,
          latitude: 10,
        });
        location.addPost(post.id);
        done();
      } catch (e) {
        done(e)
      }
    });

    it('update Location to Post.', async (done) => {
      try {
        let targetPost = await Post.findById(post.id);
        let location = await Location.create({
          longitude: 11,
          latitude: 11,
        });
        targetPost.LocationId = location.id;
        await targetPost.save();

        let checkPost = await Post.findById(post.id);
        checkPost.LocationId.should.be.eq(location.id);
        done();
      } catch (e) {
        done(e);
      }
    });

  });

});
