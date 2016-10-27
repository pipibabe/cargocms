import moment from 'moment';
module.exports = {
  getQueryObj: (input) => {
    try {
      let data = {
        where: {},
      };
      data.where.$or = [];
      for (const index in input.columns) {
        let result = {};
        const column = input.columns[index];
        const needSearch = column.searchable !== "false" && column.data !== '';
        if (needSearch) {
          const searchInclude = column.findInclude && !column.search.where;
          if (searchInclude) {
            if (column.search.concat) {
              const concat = column.search.concat;
              result = Sequelize.where(Sequelize.fn("concat", Sequelize.col(concat[0]), Sequelize.col(concat[1])), {
                like: `%${input.search.value}%`
              })
            } else {
              result[`$${column.search.model}.${column.search.column}$`] = {
                $like: `%${input.search.value}%`
              };
            }
          } else {
            result[column.data] = {
              $like: `%${input.search.value}%`
            };
          }
          data.where.$or.push(result);
          if (column.search && column.search.custom) {
            data.where[column.data] = {
              $like: `%${column.search.custom}%`
            };
          }
        }
      }
      const hasDateFilter = (input.startDate && input.startDate !== '') ||
      (input.endDate && input.endDate !== '');
      if (hasDateFilter) {
        data.where.createdAt = {};
        if (input.startDate !== '') {
          data.where.createdAt.$gte = moment(new Date(input.startDate)).format('YYYY/MM/DD');
        }
        if (input.endDate !== '') {
          data.where.createdAt.$lte = moment(new Date(input.endDate)).add(1, 'day').format('YYYY/MM/DD');
        }
      }
      data.offset = parseInt(input.start);
      data.limit = parseInt(input.length);
      data.order = input.order.map((data) => {
        let columnIndex = data.column;
        let sortColumn = input.columns[columnIndex].data;
        return [sortColumn, data.dir];
      });
      return data;
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },

  getIncudeQueryObj: ({ include, query }) => {
    try {
      let result = include;
      for (const index in query.columns) {
        const column = query.columns[index];
        if (column.searchable !== "false" && column.findInclude && column.search.where) {
          if (Array.isArray(include)) {
            result = include.map((data) => {
              let inputIncludeModelName = data.model.name;
              let searchModelName = column.search.model;
              if (inputIncludeModelName === searchModelName){
                data.where = column.search.where;
              }
              return data
            });
          } else {
            let inputIncludeModelName = include.model.name;
            let searchModelName = column.search.model;
            if (inputIncludeModelName === searchModelName){
              include.where = column.search.where;
            }
            result = include
          }
        }
      }
      return result;
    } catch (e) {
      throw e
    }
  },
}
