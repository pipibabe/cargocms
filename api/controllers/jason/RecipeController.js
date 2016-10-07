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

      return res.view({ recipe, editable, social, recipeFeedback,feelings:feelingArray , user: currentUser});
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
      if (!currentUser) return res.redirect('/login');

      const { recipe, editable, social } = await RecipeService.loadRecipe(id, currentUser);

      return res.view({ recipe, editable, social, user: currentUser });
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

      if (from === 'scent') {
        return res.view({ user, recipe, scents, totalDrops });
      }

      if (from === 'feeling') {
        feelings = await Feeling.findRamdomFeelings();

        let feelingArray = [];
        for (const feeling of feelings) {
          feelingArray.push(feeling.title);
        }

        return res.view({ user, recipe, scents, feelings: feelingArray, totalDrops });
      }
    } catch (e) {
      return res.serverError(e);
    }
  },

  allpay: async function(req, res) {
    console.log('body=>', req.body);
    try {
      const { id } = req.params;
      const user = AuthService.getSessionUser(req);
      if (!user) return res.redirect('/login');

      const { recipient, phone, address, paymentMethod } = req.body;
      const { email, note, perfumeName, description, message, invoiceNo } = req.body;
      let recipeOrder = await RecipeOrder.create({
        UserId: user.id,
        RecipeId: id,
        recipient,
        phone,
        address,
        email,
        note,
        invoiceNo,
      });
      recipeOrder = await RecipeOrder.findByIdHasJoin(recipeOrder.id);
      const formatName = recipeOrder.ItemNameArray.map((name) => {
        return name + ' 100 ml';
      });
      const allPayData = await AllpayService.getAllpayConfig({
        relatedKeyValue: {
          RecipeOrderId: recipeOrder.id,
        },
        MerchantTradeNo: crypto.randomBytes(32).toString('hex').substr(0, 8),
        tradeDesc: `配方名稱：${perfumeName} 100 ml, (備註：${message})`,
        totalAmount: 1550,
        paymentMethod: paymentMethod,
        itemArray: formatName,
      });
      if (paymentMethod == 'gotoShop') {
        const item = await Allpay.findOne({
          where:{
            MerchantTradeNo: allPayData.MerchantTradeNo
          },
          include:{
            model: RecipeOrder,
            include: [User, Recipe]
          }
        });
        item.RtnMsg = '到店購買';
        item.ShouldTradeAmt = 1550;
        item.TradeAmt = 1550;
        item.TradeNo = item.MerchantTradeNo;
        item.PaymentType = '到店購買';
        item.PaymentDate = moment(new Date()).format("YYYY/MM/DD");
        await item.save();

        let messageConfig = {};
        messageConfig.serialNumber = item.MerchantTradeNo;
        messageConfig.paymentTotalAmount = 1550;
        messageConfig.productName = recipeOrder.Recipe.perfumeName + ' 100 ml';
        messageConfig.email = recipeOrder.email;
        messageConfig.username = recipeOrder.User.displayName;
        messageConfig.shipmentUsername = recipeOrder.recipient;
        messageConfig.shipmentAddress = recipeOrder.address;
        messageConfig.note = recipeOrder.note;
        messageConfig.phone = recipeOrder.phone;
        messageConfig.invoiceNo = recipeOrder.invoiceNo;
        messageConfig = await MessageService.orderToShopConfirm(messageConfig);
        const message = await Message.create(messageConfig);
        await MessageService.sendMail(message);

        res.view('shop/done', {
          item
        });
      } else {
        return res.view({
          AioCheckOut: AllpayService.getPostUrl(),
          ...allPayData
        });
      }
    } catch (e) {
      if (e.type === 'flash') {
        req.flash('error', e.toString());
        res.redirect('/recipe/order/' + req.body.id);
      } else res.serverError(e);
    }
  }
}
