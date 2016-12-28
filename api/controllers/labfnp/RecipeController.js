import crypto from 'crypto';
import moment from 'moment';

module.exports = {
  create: async function(req, res) {
    let user, recipe, scents, totalDrops, feelings
    let {from} = req.query
    if(!from) from = "scent";
    try {
      user = AuthService.getSessionUser(req);
      if (!user) {
        return res.redirect('/login');
      }

      scents = await Scent.findAllWithRelationFormatForApp();
      recipe = Recipe.build().toJSON();
      recipe.message = "";
      recipe.description = "";
      recipe.createdBy = from;

      let scentFeedback = await ScentFeedback.findAll({
        where: {
          UserId: user.id
        },
        include: Scent
      });
      for (const feedback of scentFeedback) {
        let findIndex = _.findIndex(scents, {'name': feedback.Scent.name});
        if (findIndex > 0) {
          scents[findIndex].feelings.splice(0, 0, {key: feedback.feeling, value: '10' });
          scents[findIndex].displayFeeling.splice(0, 0, feedback.feeling);
        }
      }

      for (var i = 0; i < 6; i++) {
        let formula = {
          index: i,
          num: i + 1,
          scentCategory: '',
          scentName: '',
          feeling: '',
          drops: 0
        };
        recipe.formula.push(formula);
      }

      if (from == 'scent') {
        return res.view({ user, recipe, scents });
      }

      if (from == 'feeling') {
        feelings = await Feeling.findRamdomFeelings();
        let feelingArray = [];
        for (const feeling of feelings) {
          feelingArray.push(feeling.title);
        }

        scentFeedback = scentFeedback.map((feedback) => feedback.feeling);
        feelingArray = scentFeedback.concat(feelingArray);

        return res.view({ user, recipe, scents, feelings: feelingArray });
      }

    }
    catch (e) {
      res.serverError(e);
    }
  },

  show: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      const { recipe, editable, social, recipeFeedback} = await RecipeService.loadRecipe(id, currentUser);

      return res.view({ recipe, editable, social, recipeFeedback});
    } catch (e) {
      if (e.type === 'notFound') return res.notFound();
      return res.serverError(e);
    }
  },

  feedback: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      if (!currentUser) return res.redirect('/login');
      const { recipe, editable, social, recipeFeedback} = await RecipeService.loadRecipe(id, currentUser);
      console.log("=== recipeFeedback ===", recipeFeedback);
      let feelings = await Feeling.findRamdomFeelings();
      let feelingArray = [];
      for (const feeling of feelings) {
        feelingArray.push(feeling.title);
      }

      recipeFeedback.invoiceNo = recipeFeedback.invoiceNo ? recipeFeedback.invoiceNo : '';
      recipeFeedback.tradeNo = recipeFeedback.tradeNo ? recipeFeedback.tradeNo : '';


      let scentFeeling = await RecipeService.getUserFeeling({ userId: currentUser.id });

      return res.view({ recipe, editable, social, recipeFeedback,
        feelings:feelingArray , user: currentUser, scentFeeling});
    } catch (e) {
      if (e.type === 'notFound') return res.notFound();
      return res.serverError(e);
    }
  },

  preview: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      if (!currentUser) return res.redirect('/login');

      const { recipe, editable, social } = await RecipeService.loadRecipe(id, currentUser);

      const recipeJson = recipe.toJSON();
      if (recipeJson.UserId !== currentUser.id) {
        const message = '預覽功能僅限於您自己建立的配方！';
        return res.forbidden(message);
      }

      return res.view({ recipe, editable, social });
    } catch (e) {
      if (e.type === 'notFound') return res.notFound();
      return res.serverError(e);
    }
  },

  order: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      if (!currentUser) {
        req.flash('error','Error.Order.Need.Login');
        return res.redirect('/login');
      }

      const { recipe, editable, social } = await RecipeService.loadRecipe(id, currentUser);

      const token = crypto.randomBytes(32).toString('hex').substr(0, 32);
      return res.view({ recipe, editable, social, user: currentUser, token });
    } catch (e) {
      if (e.type === 'notFound') return res.notFound();
      return res.serverError(e);
    }
  },

  edit: async function(req, res) {
    let { from } = req.query
    if (!from || from === null) from = 'scent';
    try {
      let user = AuthService.getSessionUser(req);
      if (!user) {
        return res.redirect('/login');
      }

      const { id } = req.params;
      const scents = await Scent.findAllWithRelationFormatForApp()
      let recipe = await Recipe.findOne({
        where: { $or: [{ id }, {hashId: id}] },
        include: User
      });

      recipe = recipe.toJSON();
      recipe.createdBy = from;

      if(recipe.User.id != user.id){
        const message = "只可維護自己的配方";
        // return res.forbidden({message});
        return res.forbidden(message);
      }
      user = recipe.User;
      let recipeFormula = recipe.formula;
      let formatFormula = [];
      let totalDrops = 0;
      let feelings = {};

      for (var i = 0; i < 6; i++) {
        let formula = {
          index: i,
          num: i + 1,
          scentCategory: '',
          scentName: '',
          drops: 0
        };
        if (recipeFormula[i] != null) {
          formula.drops = recipeFormula[i].drops;
          formula.scentName = recipeFormula[i].scent;
          formula.scentCategory = recipeFormula[i].scent.charAt(0);
          formula.feeling = recipeFormula[i].feeling;
        }

        totalDrops += parseInt(formula.drops, 10);
        formatFormula.push(formula);
      }
      recipe.formula = formatFormula;

      let scentFeeling = await RecipeService.getUserFeeling({ userId: user.id });
      let feedback = '';
      let recipeFeedback = await RecipeFeedback.findOne({
        where: {
          RecipeId: recipe.id,
          UserId: user.id,
        }
      });
      if (recipeFeedback && recipeFeedback.feeling) {
        feedback = recipeFeedback.feeling.join(',');
      }

      if (from === 'scent') {
        return res.view({ user, recipe, scents, totalDrops, scentFeeling, feedback });
      }

      if (from === 'feeling') {
        feelings = await Feeling.findRamdomFeelings();

        let feelingArray = [];
        for (const feeling of feelings) {
          feelingArray.push(feeling.title);
        }

        return res.view({ user, recipe, scents, feelings: feelingArray, totalDrops, scentFeeling, feedback });
      }
    } catch (e) {
      return res.serverError(e);
    }
  },

  allpay: async function(req, res) {
    sails.log.warn('新建訂單傳入資料', req.body);
    const { id } = req.params;
    const user = AuthService.getSessionUser(req);
    if (!user) return res.redirect('/login');

    const { recipient, phone, address, paymentMethod } = req.body;
    const { email, note, perfumeName, description, message, invoiceNo, token } = req.body;

    try {
      let updateUserData = await User.findById(user.id);
      let userNeedUpdate = false;
      //update Phone
      if( !updateUserData.phone1 && !updateUserData.phone2 ) {
        updateUserData.phone1 = phone;
        userNeedUpdate = true;
      }
      //update Email
      if( !updateUserData.email ){
        updateUserData.email = email;
        userNeedUpdate = true;
      }
      if( userNeedUpdate ) {
        updateUserData = await updateUserData.save().catch(sequelize.UniqueConstraintError, function(err) {
          sails.log.error('Email 重複，不更新使用者帳號資訊')
        });
      };
    } catch (e) {
      sails.log.error('更新使用者失敗', e)
    }

    const isolationLevel = sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE;
    let MerchantTradeNo = crypto.randomBytes(32).toString('hex').substr(0, 8);

    let findOrder = await Allpay.find({
      where: {
        PaymentType: '到店購買',
      },
      include: {
        model: RecipeOrder,
        where: { token },
        include: [Recipe, User],
      },
    });

    if (findOrder && paymentMethod == 'gotoShop') {
      return res.redirect(`/recipe/done?t=${findOrder.MerchantTradeNo}`);
    }

    const createOrder = (transaction) => {
      return new Promise(function(resolve, reject) {
        RecipeOrder.create({
          UserId: user.id,
          RecipeId: id,
          recipient,
          phone,
          address,
          email,
          note,
          invoiceNo,
          token,
          productionStatus: paymentMethod == 'gotoShop' ? 'PAID' : 'NEW',
        }, { transaction })
        .then(function(order) {
          resolve(order);
        }).catch(function(err) {
          reject(err)
        });
      });
    }

    const createAndgetAllpayConfig = ({formatName, recipeOrder, transaction, goshopInfo}) => {
      return new Promise(function(resolve, reject) {
        AllpayService.createAndgetAllpayConfig({
          relatedKeyValue: {
            RecipeOrderId: recipeOrder.id,
          },
          MerchantTradeNo,
          tradeDesc: `配方名稱：${perfumeName} 100 ml, (備註：${message})`,
          totalAmount: 1550,
          paymentMethod: paymentMethod,
          itemArray: formatName,
          clientBackURL: '/recipe/done',
          returnURL: '/api/recipe/paid',
          paymentInfoURL: '/api/recipe/paymentinfo',
          transaction,
          ...goshopInfo,
        }).then(function(allPayData) {
          MerchantTradeNo = allPayData.allpay.MerchantTradeNo;
          resolve(allPayData);
        }).catch(function(err) {
          reject(err)
        });
      });
    }

    const sendEmail = ({transaction, config}) => {
      return new Promise(function(resolve, reject) {
        Message.create(config, { transaction }).then(function(message) {
          sails.log.warn('到店購買訂單建立完成 RecipeOrder 寄送 Email id:', message.id);
          MessageService.sendMail(message);
          resolve();
        }).catch(function(err) {
          reject(err)
        });
      });
    }

    let transaction, recipeOrder, allPayData;
    const formatName = [perfumeName + ' 100 ml'];

    return sequelize.transaction({ isolationLevel })
    .then(function (t) {
      transaction = t;
      return createOrder(transaction);
    })
    .then(function(data){
      recipeOrder = data;
      let goshopInfo = {};
      if (paymentMethod == 'gotoShop') {
        goshopInfo.RtnMsg = '到店購買';
        goshopInfo.ShouldTradeAmt = 1550;
        goshopInfo.TradeAmt = 1550;
        goshopInfo.PaymentType = '到店購買';
        goshopInfo.PaymentDate = moment(new Date()).format("YYYY/MM/DD");
      }
      return createAndgetAllpayConfig({formatName, recipeOrder, transaction, goshopInfo});
    })
    .then(function(data) {
      allPayData = data;
      sails.log.warn('訂單建立 RecipeOrder',
        '收件人:', recipeOrder.recipient,
        'UserId:', recipeOrder.UserId,
        'RecipeId:', recipeOrder.RecipeId,
        '購買方式:', paymentMethod,
        '訂購物品:', formatName,
        '訂單編號:', MerchantTradeNo,
        '建立時間:', recipeOrder.createdAt,
        'AllpayId:', allPayData.allpay.id,
      );
      if (paymentMethod == 'gotoShop') {
        let messageConfig = {};
        messageConfig.serialNumber = MerchantTradeNo;
        messageConfig.paymentTotalAmount = 1550;
        messageConfig.productName = perfumeName + ' 100 ml';
        messageConfig.email = recipeOrder.email;
        messageConfig.username = user.displayName;
        messageConfig.shipmentUsername = recipeOrder.recipient;
        messageConfig.shipmentAddress = recipeOrder.address;
        messageConfig.note = recipeOrder.note;
        messageConfig.phone = recipeOrder.phone;
        messageConfig.invoiceNo = recipeOrder.invoiceNo;
        const config = MessageService.orderToShopConfirm(messageConfig);
        return sendEmail({transaction, config});
      }
    })
    .then(function(){
      transaction.commit();
      if (paymentMethod == 'gotoShop') {
        return res.redirect(`/recipe/done?t=${MerchantTradeNo}`);
      } else {
        sails.log.warn('歐付寶訂單建立完成 RecipeOrder');
        return res.view({
          AioCheckOut: AllpayService.getPostUrl(),
          ...allPayData.config
        });
      }
    })
    .catch(sequelize.UniqueConstraintError, function(e) {
      throw Error('此交易已失效，請重新下訂')
    })
    .catch(function(err) {
      sails.log.error('訂單建立 RecipeOrder 失敗', err.toString());
      transaction.rollback();
      req.flash('error', err.toString());
      return res.serverError(err, {redirect: '/recipe/order/' + req.query.hashId});
    });
  },

  done: async (req, res) => {
    try {
      let user = AuthService.getSessionUser(req);
      if (!user) {
        return res.redirect('/login');
      }


      const merchantTradeNo = req.query.t;
      const item = await Allpay.findOne({
        where:{
          MerchantTradeNo: merchantTradeNo
        },
        include:{
          model: RecipeOrder,
          include: [
            {
              model: User,
              where: { Id: user.id } },
            Recipe
          ]
        }
      });

      if(!item){
        throw Error(`找不到 ${merchantTradeNo} 編號的交易，或是使用者錯誤`);
      }

      res.view('labfnp/recipe/done', {item} );

    } catch (e) {
      res.serverError(e);
    }
  }
}
