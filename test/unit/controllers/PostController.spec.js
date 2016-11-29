import {mockAdmin, unMockAdmin} from "../../util/adminAuthHelper.js"

describe('about Post Controller operation.', function() {
  before(async (done) => {
    try {
      await mockAdmin();
      done();
    } catch (e) {
      done(e);
    }
  });

  after(async (done)=>{
    try {
      await unMockAdmin();
      done();
    } catch (e) {
      done(e);
    }
  })

  it('create Post should success.', async (done) => {
    const data = {
      title: '香味的一沙一世界6',
      content: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材（ex:玫瑰、康乃馨..等)所組成的『這束花的味道』，接著抽出其中的一朵康乃馨',
      url: 'http://localhost:5001/blog/flower',
      abstract: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材',
      TagsArray: [ '香水', '花' ],
    };
    try {
      const res = await request(sails.hooks.http.app)
      .post(`/api/admin/post`)
      .send(data);
      res.status.should.be.eq(200);
      res.body.should.be.Object;
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('find & update post by id', () => {
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

    it('get all post', async(done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .get(`/api/admin/post`);
        sails.log.info(JSON.stringify(res.body, null, 2));
        res.status.should.be.eq(200);
        res.body.should.be.Object;
        done()
      } catch (e) {
        done(e)
      }
    });

    it('findOne Post should be success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .get(`/api/admin/post/${targetPost.id}`);
        res.status.should.be.eq(200);
        res.body.should.be.Object;
        done();
      } catch (e) {
        done(e);
      }
    });

    it('update Post should success.', async (done) => {
      try {
        const data = {
          title: 'new Title',
          content: 'new content',
          url: 'http://localhost:5001/blog/flower',
          abstract: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材',
          TagsArray: [ '香水', '花' ],
        }
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/post/${targetPost.id}`)
        .send(data);
        sails.log.info(JSON.stringify(res.body, null, 2));
        res.status.should.be.eq(200);
        res.body.should.be.Object;
        done();
      } catch (e) {
        done(e);
      }
    });

    it('update Post none tag should success.', async (done) => {
      try {
        const data = {
          title: 'new Title',
          content: 'new content',
          url: 'http://localhost:5001/blog/flower',
          abstract: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材',
        }
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/post/${targetPost.id}`)
        .send(data);
        sails.log.info(JSON.stringify(res.body, null, 2));
        res.status.should.be.eq(200);
        res.body.should.be.Object;
        done();
      } catch (e) {
        done(e);
      }
    });

  });

  describe('delete post by id', () => {
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

    it('delete Post should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .delete(`/api/admin/post/${targetPost.id}`);
        sails.log.info(JSON.stringify(res.body, null, 2));
        res.status.should.be.eq(200);
        res.body.should.be.Object;
        done();
      } catch (e) {
        done(e);
      }
    });

  });

});
