module.exports = {

  index: async function(req, res) {
    try {
      const groupId = req.params.groupId;
      const indexGroup = await Group.findOne({ where: {title: '實例照片'} });
      if (groupId == 0) {
        return res.redirect(`performance/group/${indexGroup.id}/page/1`);
      }
      const isShowWithTable = (groupId == indexGroup.id) ? false : true;
      const page = ~~req.params.page;
      const performanceGroups = await Group.findWithType('performance');
      const pageData = await PostService.getPostsInPage({
        groupId,
        page,
        size: isShowWithTable ? 26 : 6,
        contentType: Performance
      });
      const maxPage = pageData.maxPage;
      const nextPage = pageData.nextPage;
      const prevPage = pageData.prevPage;
      if(page < 1 || (maxPage !== 0 && page > maxPage)){
        res.redirect(`performance/group/${groupId}/page/1`);
        return;
      }
      for (let value of pageData.posts) {
        let images = await Image.findAll({
          where: {
            PerformanceId: value.id
          },
          order: ['sequence', ['id', 'DESC']],
        });
        value.Images = images;
      }
      return res.view({
        performanceGroups,
        posts: pageData.posts,
        maxPage,
        page,
        prevPage,
        nextPage,
        isShowWithTable,
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },

  show: async function(req, res) {
    try {
      const performanceId = req.params.performanceId;
      const performance = await Performance.findOne({
        where: {
          id: performanceId,
        },
        include: [
          Post,
        ],
      });
      performance.content = performance.Post.content;
      const performanceImages = await Image.findAll({
        where: {
          PerformanceId: performance.id,
        },
        order: ['sequence', ['id', 'DESC']],
      });
      const nextPerformance = await await Performance.findOne({
        where: {
          id: {
            $lt: performanceId,
          },
        },
        include: [{
          model: Post,
          required: true,
          include: [{
            model: Group,
            where: {
              title: '實例照片'
            }
          }]
        }],
        order: 'id DESC',
      });
      const prevPerformance = await await Performance.findOne({
        where: {
          id: {
            $gt: performanceId,
          },
        },
        include: [{
          model: Post,
          required: true,
          include: [{
            model: Group,
            where: {
              title: '實例照片'
            }
          }]
        }],
        order: 'id',
      });
      const performanceGroups = await Group.findWithType('performance');

      return res.view({
        performance,
        performanceImages,
        performanceGroups,
        nextPerformance,
        prevPerformance,
      });
    }
    catch (e) {
      res.serverError(e);
    }
  },

}
