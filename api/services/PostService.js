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
        location.addPost(post.id);
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
}
