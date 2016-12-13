
module.exports = {

  find: async (req, res) => {
    try {
      const { query } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      if (serverSidePaging) {
        result = await PagingService.process({query, modelName});
      } else {
        const items = await sails.models[modelName].findAll();
        result = { data: { items } };
      }
      res.ok(result);
    } catch (e) {
      res.serverError(e);
    }
  },

  findOne: async (req, res) => {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      const isAdmin = AuthService.isAdmin(req);
      let { recipe } =  await RecipeService.loadRecipe(id, currentUser, isAdmin);
      sails.log.info('backend get recipe =>', recipe);
      res.ok({
        message: 'Get recipe success.',
        data: {item: recipe},
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    const data = req.body;
    try {
      const loginedUser = AuthService.getSessionUser(req);
      if (loginedUser) {
        data.UserId = loginedUser.id;
      }
      sails.log.info('backend create recipe controller=>', data);
      const recipe = await RecipeService.create(data);
      await RecipeService.createUserFeeling({
        formula: data.formula,
        userId: loginedUser.id
      });

      if (data.feedback && data.feedback.length > 0) {
        await RecipeFeedback.create({
          feeling: data.feedback,
          UserId: loginedUser.id,
          RecipeId: recipe.id,
        });
      }
      req.flash('info', 'Info.New.Recipe');
      res.ok({
        message: 'Create recipe success.',
        data: recipe,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      sails.log.info('backend update recipe controller id=>', id);
      sails.log.info('backend update recipe controller data=>', data);
      const user = AuthService.getSessionUser(req);

      const recipe = await RecipeService.update({
        id: id,
        ...data,
      });

      await RecipeFeedback.update({
        feeling: data.feedback
      },{
        where: { UserId: user.id, RecipeId: id }
      });

      await RecipeService.updateUserFeeling({
        formula: data.formula,
        userId: user.id,
      });

      res.ok({
        message: 'Update recipe success.',
        data: recipe,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      sails.log.info('backend delete recipe controller=>', id);
      const userId = AuthService.getSessionUser(req).id;
      const recipe = await Recipe.deleteById(id);
      res.ok({
        message: 'Delete recipe success.',
        data: {
          userId
        },

      });
    } catch (e) {
      res.serverError(e);
    }
  },

  paid: async (req, res) => {
    try {
      const data = req.body;
      sails.log.warn('歐付寶回傳付款完成資料', data);
      const allpay = await AllpayService.paid(data);

      //  create and send message
      let messageConfig = {};
      messageConfig.serialNumber = allpay.TradeNo;
      if (allpay.RecipeOrderId) {
        const recipeOrder = await RecipeOrder.findByIdHasJoin(allpay.RecipeOrderId);
        if (parseInt(allpay.RtnCode, 10) === 1) {
          recipeOrder.productionStatus = 'PAID';
        }
        await recipeOrder.save();
        messageConfig.email = recipeOrder.email;
        messageConfig.username = recipeOrder.User.displayName;
      }
      messageConfig = await MessageService.paymentConfirm(messageConfig);
      const message = await Message.create(messageConfig);
      await MessageService.sendMail(message);
      sails.log.warn('收到 歐付寶回傳付款完成 寄送Email id:', message.id);

      res.send('1|OK');
    } catch (e) {
      sails.log.error('歐付寶回傳付款完成資料失敗', e.toString());
      res.serverError(e);
    }
  },

  paymentinfo: async(req, res) => {
    try {
      const data = req.body;
      sails.log.warn('歐付寶回傳付款資訊', data);
      const allpay = await AllpayService.paymentinfo(data);

      //  create and send message
      let messageConfig = {};
      messageConfig.serialNumber = allpay.TradeNo;
      messageConfig.paymentTotalAmount = allpay.ShouldTradeAmt;
      messageConfig.bankName = sails.__({
        phrase: allpay.PaymentType,
        locale: 'zh'
      });
      messageConfig.bankId = allpay.BankCode;
      messageConfig.accountId = allpay.vAccount;
      messageConfig.expireDate = allpay.ExpireDate;
      if (allpay.RecipeOrderId) {
        const recipeOrder = await RecipeOrder.findByIdHasJoin(allpay.RecipeOrderId);
        messageConfig.productName = recipeOrder.Recipe.perfumeName + ' 100 ml';
        messageConfig.email = recipeOrder.email;
        messageConfig.username = recipeOrder.User.displayName;
        messageConfig.shipmentUsername = recipeOrder.recipient;
        messageConfig.shipmentAddress = recipeOrder.address;
        messageConfig.note = recipeOrder.note;
        messageConfig.phone = recipeOrder.phone;
        messageConfig.invoiceNo = recipeOrder.invoiceNo;
      }
      messageConfig = await MessageService.orderConfirm(messageConfig);
      const message = await Message.create(messageConfig);
      await MessageService.sendMail(message);
      sails.log.warn('收到 歐付寶回傳付款資訊 寄送Email id:', message.id);

      res.send('1|OK');
    } catch (e) {
      res.serverError(e);
    }
  },

  export: async (req, res) => {
    try {
      let { query, options } = req;
      sails.log.info('export', query);
      const modelName = options.controller.split("/").reverse()[0];
      const content = await ExportService.query({ query, modelName });
      const columns = {
        id: 'ID',
        perfumeName: '香水名稱',
        authorName: '創作人',
        createdAt: '建立日期',
        visibilityDesc: '公開狀態',
        description: '香水描述',
        message: '額外資訊',
        scent0: '香味分子 1',
        scentml0: '香味分子 1 滴數',
        scentPercent0: '香味分子 1 比例',
        scent1: '香味分子 2',
        scentml1: '香味分子 2 滴數',
        scentPercent1: '香味分子 2 比例',
        scent2: '香味分子 3',
        scentml2: '香味分子 3 滴數',
        scentPercent2: '香味分子 3 比例',
        scent3: '香味分子 4',
        scentml3: '香味分子 4 滴數',
        scentPercent3: '香味分子 4 比例',
        scent4: '香味分子 5',
        scentml4: '香味分子 5 滴數',
        scentPercent4: '香味分子 5 比例',
        scent5: '香味分子 6',
        scentml5: '香味分子 6 滴數',
        scentPercent5: '香味分子 6 比例',
      }
      const format = (items) => {
        let result = items.map((data) => {
          let formatted = {
            id: data.id,
            perfumeName: data.perfumeName,
            authorName: data.authorName,
            createdAt: data.createdAt,
            visibilityDesc: data.visibilityDesc,
            description: data.description,
            message: data.message,
          }
          data.formula.forEach((formula, index) => {
            if (formula.scent && formula.drops > 0) {
              formatted[`scent${index}`] = `${formula.scent}`;
              formatted[`scentml${index}`] = `${formula.drops}`;
              formatted[`scentPercent${index}`] = Math.ceil(formula.drops / data.formulaTotalDrops * 10000)/10000;
            }
          });
          return formatted;
        });
        return result;
      }

      const result = await ExportService.export({
        fileName: modelName,
        content,
        format,
        columns,
      });
      res.attachment(result.fileName);
      res.end(result.data, 'UTF-8');
    } catch (e) {
      res.serverError(e);
    }
  },
}
