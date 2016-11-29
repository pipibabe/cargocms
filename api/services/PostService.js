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
    alias,
    type,
    publish,
    eventId,
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
        alias,
        type,
        publish,
      });
      if (eventId) {
        for (const event of eventId) {
          if ( event.id !== 0) {
            await Event.update({ PostId: post.id }, { where: { id: event.id } });
          }
        }
      }
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
    alias,
    type,
    publish,
    eventId,
  }) {
    try {
      if ( type === 'internal-event') {
        const id = eventId.map((event) => event.id);
        const deleteEventPost = [];
        deleteEventPost.push(
          Event.update({PostId: null}, {
            where: {
              id: { $notIn: id }
            }
          })
        );
        await Promise.all(deleteEventPost);
        for (const event of eventId) {
          if ( event.id !== 0) {
            await Event.update({ PostId: postId }, { where: { id: event.id } });
          }
        }
      }
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
        alias,
        type,
        publish,
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
