import FacebookHelper from './libraries/facebook/'

module.exports = {
  process: async ({query, modelName, include}) => {
    let findQuery = {};
    try {
      if (query.where) {
        findQuery = {
          where: query.where,
        };
      } else {
        findQuery = FormatService.getQueryObj(query);
      }
      if (include) {
        include = FormatService.getIncudeQueryObj({ include, query });
        findQuery.include = include;
      }
      const result = await sails.models[modelName].findAndCountAll(findQuery)
      const data = result.rows;
      const recordsTotal = data.length
      const recordsFiltered = result.count;
      const draw = parseInt(query.draw) + 1
      return { draw, recordsTotal, recordsFiltered, data };
    } catch (e) {
      throw e;
    }
  },
}
