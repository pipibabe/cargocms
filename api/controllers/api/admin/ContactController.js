module.exports = {

  find: async (req, res) => {
    try {
      let {query} = req
      let {serverSidePaging} = query
      let modelName = req.options.controller.split("/").reverse()[0]
      let result;
      if(serverSidePaging){
        result = await PagingService.process({query, modelName});
      }else {
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
      const contact = await Contact.findById(id);
      sails.log.info('get contact =>', contact);
      res.ok({
        message: 'Get contact success.',
        data: {item: contact},
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  // create: async (req, res) => {
  //   const data = req.body;
  //   try {
  //     sails.log.info('create contact controller=>', data);
  //     const contact = await UserService.create(data);
  //
  //     const checkCreatedResult = contact.contactname === data.contactname;
  //     if (checkCreatedResult) {
  //
  //       res.ok({
  //         message: 'Create contact success.',
  //         data: contact,
  //       });
  //     } else {
  //
  //       req.flash('新增使用者失敗，請檢查使用者名稱/信箱是否重複！');
  //     }
  //   } catch (e) {
  //     res.serverError(e);
  //   }
  // },
  //
  // update: async (req, res) => {
  //   const { id } = req.params;
  //   const data = req.body;
  //   try {
  //     sails.log.info('update contact controller id=>', id);
  //     sails.log.info('update contact controller data=>', data);
  //     const contact = await UserService.update({
  //       id: id,
  //       ...data,
  //     });
  //     res.ok({
  //       message: 'Update contact success.',
  //       data: contact,
  //     });
  //   } catch (e) {
  //     res.serverError(e);
  //   }
  // },

  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      sails.log.info('delete contact controller=>', id);
      const contact = await Contact.destroy({ where: { id } });
      res.ok({
        message: 'Delete contact success.',
        data: contact,
      });
    } catch (e) {
      res.serverError(e);
    }
  }
}
