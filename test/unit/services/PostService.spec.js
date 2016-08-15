describe('about Post Service operation.', function() {

  describe('create post', () => {
    before(async (done) => {
      done();
    });
    it('create Post should success.', async (done) => {
      try {
        const post = await PostService.create({
          title: '香味的一沙一世界',
          content: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材（ex:玫瑰、康乃馨..等)所組成的『這束花的味道』，接著抽出其中的一朵康乃馨',
          url: 'http://localhost:5001/blog/flower',
          abstract: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材',
          longitude: 10,
          latitude: 10,
        });
        done();
      } catch (e) {
        done(e)
      }
    });
  });

  describe('find & update & destroy post by id', () => {
    let targetPost;
    before(async (done) => {
      try {
        const image = await Image.create({
          filePath: 'http://www.labfnp.com/modules/core/img/update1.jpg',
          type: 'image/jpeg',
          storage: 'url',
        });
        targetPost = await Post.create({
          title: '香味的一沙一世界2',
          content: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材（ex:玫瑰、康乃馨..等)所組成的『這束花的味道』，接著抽出其中的一朵康乃馨',
          cover: image.id,
          url: 'http://localhost:5001/blog/flower',
          abstract: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材',
        })
        const tag = await Tag.create({
          title: 'A'
        });
        await targetPost.addTag(tag.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('update Post should success.', async (done) => {
      try {
        let data = {
          title: '香味的一沙一世界3',
          content: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材（ex:玫瑰、康乃馨..等)所組成的『這束花的味道』，接著抽出其中的一朵康乃馨',
          url: 'http://localhost:5001/blog/flower',
          abstract: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材',
          TagsArray: [ '香水', '花' ],
          longitude: 11,
          latitude: 11,
        }
        const post = await PostService.update(targetPost.id, data);
        done()
      } catch (e) {
        done(e)
      }
    });
  });

});
