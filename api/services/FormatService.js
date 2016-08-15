module.exports = {
  getQueryObj: (input) => {
    try {
      sails.log.debug(data);
      let data = {
        where: {},
      };
      data.where.$or = input.columns.reduce((result, column) => {
        let data = {};

        if(column.searchable == "false") return result;

        data[column.data] = {
          $like: `%${input.search.value}%`
        }
        result.push(data);
        return result;
      }, []);
      data.offset = input.start;
      data.limit = input.length;
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
}
