module.exports = {
  create: async function ({
    title,
    content,
    cover = null,
    coverType,
    coverUrl,
    url,
    abstract,
    UserId,
    longitude,
    latitude,
  }) {
    try {
      const post = await Post.create({
        title,
        content,
        cover: cover === '' ? null : cover,
        coverType,
        coverUrl,
        url,
        abstract,
        UserId,
      });
      if (longitude && latitude) {
        // 不知道為什麼無法運作
        // let location = await Location.findOrCreate({
        //   where: { longitude, latitude },
        //   defaults: { longitude, latitude },
        // });
        let location = await Location.findOne({
          where: { longitude, latitude}
        });
        if (!location) {
          location = await Location.create({ longitude, latitude });
        }
        await location.addPost(post.id);
      }
      return post;
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },

  update: async function (postId, {
    title,
    content,
    cover,
    coverType,
    coverUrl,
    url,
    abstract,
    TagsArray,
    longitude,
    latitude,
  }) {
    try {
      let location = null;
      if (longitude && latitude) {
        // let location = await Location.findOrCreate({
        //   where: { longitude, latitude },
        //   defaults: { longitude, latitude },
        // });
        location = await Location.findOne({
          where: { longitude, latitude}
        });
        if (!location) {
          location = await Location.create({ longitude, latitude });
        }
      }
      await Post.update({
        title,
        content,
        cover: cover === '' ? null : cover,
        coverType,
        coverUrl,
        url,
        abstract,
        LocationId: location ? location.id : null,
      }, {
        where: {
          id: postId,
        }
      });
      await TagService.updateOrCreate({
        postId,
        datas: TagsArray
      });
      return true;
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },

  getPostsInPage: async ({
    page,
    contentType,
    size,
    groupId,
  }) => {
    try {
      const offset = (page - 1) * size;
      let maxPage, posts;
      if (groupId == 0) {
        maxPage = Math.ceil( (await Post.findAllItems(contentType, 0)).length / size );
        posts = await Post.findAllItems(contentType, offset, size);
      } else {
        maxPage = Math.ceil( (await Post.findItemsByGroupId(contentType, groupId, 0)).length / size );
        posts = await Post.findItemsByGroupId(contentType, groupId, offset, size);
      }
      const nextPage = (page === maxPage) ? page : page+1;
      const prevPage = (page === 1) ? page : page-1;
      return {
        maxPage, posts, prevPage, nextPage
      };
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },

}
