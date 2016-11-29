import crypto from 'crypto';
import moment from 'moment';

module.exports = {

  index: async (req, res) => {
    try {
      const {type} = req.query
      const order = 'DESC';
      let where = {
        publish: true,
        type: ["internal-event", "external-event"]
      }

      let posts = await Post.findAllHasJoin({order, where});

      const social = SocialService.forPost({posts});
      const items = posts;
      const data = {items}

      res.view('event/index', {data, social});
    } catch (e) {
      res.serverError(e);
    }
  },

  show: async (req, res) => {
    try {
      const {id, name} = req.params
      let data = await Post.findByIdHasJoinByEvent({id, name});

      if(!data || !data.publish){
        sails.log.error(`Event ID or Name: ${id || name} ,data not found or not publish.`);
        return res.notFound();
      }

      if (data.url) {
        return res.redirect(data.url)
      }
      const social = SocialService.forPost({posts: [data]});

      data.Events.forEach((e) => {
        e = Object.assign(e, EventService.getTicketStatus(e, new Date()));
      });

      res.view('event/show', {data, social});
    } catch (e) {
      res.serverError(e);
    }
  },

  order: async function(req, res) {
    const { id } = req.params;
    try {
      const currentUser = AuthService.getSessionUser(req);
      if (!currentUser) {
        req.flash('error','Error.Order.Need.Login');
        return res.redirect(`/login?url=/event/order/${id}`);
      }

      const event = await Event.findOne({
        where: { id },
      });

      const token = crypto.randomBytes(32).toString('hex').substr(0, 32);

      return res.view({ event, user: currentUser, token });
    } catch (e) {
      if (e.type === 'notFound') return res.notFound();
      return res.serverError(e);
    }
  },

  allpay: async function(req, res) {
    sails.log.warn('新建訂單傳入資料', req.body);
    // const isolationLevel = sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE;
    // const transaction = await sequelize.transaction({ isolationLevel, autocommit: false });
    try {
      const { id } = req.params;
      const user = AuthService.getSessionUser(req);
      if (!user) return res.redirect(`/login?url=/event/order/${id}`);

      const { recipient, phone, email, address, note, description, paymentMethod, token } = req.body;

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
      const event = await Event.findById(id);

      let findOrder = await Allpay.find({
        where: {
          PaymentType: '到店購買',
        },
        include: {
          model: EventOrder,
          where: { token },
        },
      });
      if (findOrder) {
        return res.redirect(`/event/done?t=${findOrder.MerchantTradeNo}`);
      }

      let eventOrder = await EventOrder.create({
        UserId: user.id,
        EventId: id,
        recipient,
        phone,
        address,
        email,
        note,
        token,
        productionStatus: event.price === 0 ? 'PAID' : 'NEW',
      }).catch(sequelize.UniqueConstraintError, function(err) {
        throw Error('此交易已失效，請重新下訂')
      });

      let MerchantTradeNo = crypto.randomBytes(32).toString('hex').substr(0, 8);
      const allPayData = await AllpayService.createAndgetAllpayConfig({
        relatedKeyValue: {
          EventOrderId: eventOrder.id,
        },
        MerchantTradeNo,
        tradeDesc: event.description,
        totalAmount: event.price,
        paymentMethod: paymentMethod,
        itemArray: [ event.title ],
        clientBackURL: '/event/done',
        returnURL: '/api/event/paid',
        paymentInfoURL: '/api/event/paymentinfo',
      });

      event.signupCount = event.signupCount + 1;
      if (event.signupCount > event.limit) {
        throw Error('票卷已賣完');
      }

      if (event.price === 0) {

        allPayData.allpay.RtnMsg = '免費活動';
        allPayData.allpay.ShouldTradeAmt = 0;
        allPayData.allpay.TradeAmt = 0;
        allPayData.allpay.PaymentType = '免費活動';
        allPayData.allpay.PaymentDate = moment(new Date()).format("YYYY/MM/DD");
        await allPayData.allpay.save();
        // transaction.commit();

        await event.save();

        try {
          let messageConfig = {};
          messageConfig.serialNumber = MerchantTradeNo;
          messageConfig.email = email;
          messageConfig.username = user.displayName;
          sails.log.debug(messageConfig);
          messageConfig = await MessageService.eventPaymentConfirm(messageConfig);
          const message = await Message.create(messageConfig);
          await MessageService.sendMail(message);
          sails.log.warn('到店購買訂單建立完成 RecipeOrder 寄送 Email id:', message.id);
        } catch (e) {
          sails.log.error('寄信失敗', e)
        }

        return res.redirect(`/event/done?t=${MerchantTradeNo}`);

      } else {

        sails.log.warn('歐付寶訂單建立完成 EventOrder');
        // transaction.commit();
        return res.view({
          AioCheckOut: AllpayService.getPostUrl(),
          ...allPayData.config
        });

      }

    } catch (e) {
      // transaction.rollback();
      sails.log.error('訂單建立 EventOrder 失敗', e.toString());
      req.flash('error', e.toString());
      res.serverError(e, {redirect: '/event/order/' + req.body.id});
    }
  },

  done: async function(req, res) {
    try {
      const merchantTradeNo = req.query.t;
      const item = await Allpay.findOne({
        where:{
          MerchantTradeNo: merchantTradeNo
        },
        include:{
          model: EventOrder,
          include: [User, Event]
        }
      });

      if(!item){
        throw Error(`找不到 ${merchantTradeNo} 編號的交易`);
      }
      res.view('event/done', {item} );

    } catch (e) {
      res.serverError(e);
    }
  },
}
