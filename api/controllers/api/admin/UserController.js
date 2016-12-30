module.exports = {

  findCurrentUser: async (req, res) => {
    try {
      if (!req.user.id)
        throw Error('no login');

      const where = {
        where: {
          id: req.user.id,
        },
        include: [
          Role,
          Supplier,
        ],
      };
      const currentUser = await User.find(where);
      const result = {
        data: {
          currentUser,
        },
      };
      res.ok(result);
    } catch (e) {
      res.serverError(e);
    }
  },

  find: async (req, res) => {
    try {
      let {query} = req
      let {serverSidePaging} = query
      let modelName = req.options.controller.split("/").reverse()[0]
      let result;
      if(serverSidePaging){
        result = await PagingService.process({query, modelName});
      } else {
        const items = await sails.models[modelName].findAll();
        result = {data: {items}}
      }
      res.ok(result);
    } catch (e) {
      res.serverError(e);
    }
  },

  findOne: async (req, res) => {
    console.log("=== findOne ===");
    const { id } = req.params;
    try {
      const user = await User.findOneWithPassport({id})
      sails.log.info('get user =>', user);
      res.ok({
        message: 'Get user success.',
        data: user,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    const data = req.body;
    try {
      sails.log.info('create user controller=>', data);
      const user = await UserService.create(data);

      const checkCreatedResult = user.username === data.username;
      if (checkCreatedResult) {

        res.ok({
          message: 'Create user success.',
          data: user,
        });
      } else {

        req.flash('新增使用者失敗，請檢查使用者名稱/信箱是否重複！');
      }
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      sails.log.info('update user controller id=>', id);
      sails.log.info('update user controller data=>', data);
      const user = await UserService.update({
        id: id,
        ...data,
      });
      res.ok({
        message: 'Update user success.',
        data: user,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      sails.log.info('delete user controller=>', id);
      const user = await User.deleteById(id);
      res.ok({
        message: 'Delete user success.',
        data: user,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  exportBirthday: async (req, res) => {
    try {
      let { body } = req;
      sails.log.info('export Birthday', body.month);
      const modelName = 'user';

      let content = await User.findAll({
        where: sequelize.where(
          User.sequelize.fn('DATE_FORMAT', User.sequelize.col('birthday'), '%c'), body.month
        )
      });

      const columns = [
        { caption: "使用者名稱", type: "string"},
        { caption: "全名", type: "string"},
        { caption: "Email", type: "string"},
        { caption: "FacebookID", type: "string"},
        { caption: "生日", type: "string"},
        { caption: "手機", type: "string"},
        { caption: "電話", type: "string"},
        { caption: "地址1", type: "string"},
        { caption: "地址2", type: "string"}
      ]
      const format = (items) => {
        let result = [];
        for (let data of items) {
          let formatted = [
            data.username,
            data.displayName,
            data.email,
            data.FacebookId ? data.FacebookId : '',
            data.birthday,
            data.phone1,
            data.phone2,
            data.address,
            data.address2
          ]

          result.push(formatted);
        };
        return result;
      }

      const result = await ExportService.exportExcel({
        fileName: `${body.month}月壽星資料`,
        content,
        format,
        columns,
      });
      res.ok({
        message: 'Get Excel export success.',
        data: result.fileName,
      })
    } catch (e) {
      res.serverError(e);
    }
  },

}
