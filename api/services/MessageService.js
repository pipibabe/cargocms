import {sprintf} from 'sprintf-js';

module.exports = {

  /*
   * 向新註冊的使用者問安
   */
  greeting: (user) => {

    try {
      var greetingTpl = sails.config.mail.templete.greeting;
      var email = user.email;
      var mailSendConfig = {...greetingTpl, to: email};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        username: user.username
      });

      mailSendConfig.html = sprintf(mailSendConfig.html, {
        storeName: 'LFP',
        username: user.username
      });

      mailSendConfig.type = 'greeting';

      return mailSendConfig;

    } catch (e) {
      throw error;
    }

  },
  orderConfirm: (result = {
    productName, serialNumber, email, username, bankId, bankName, bankName,
    accountId, accountName, paymentTotalAmount, shipmentUsername, shipmentAddress,
    note, phone, invoiceNo
  }) => {

    try {

      let orderConfirmTemplete = sails.config.mail.templete.orderConfirm;
      let mailSendConfig = {...orderConfirmTemplete, to: result.email};
      let orderSerialNumber = result.serialNumber;
      let DOMAIN_HOST = process.env.DOMAIN_HOST || 'localhost:5001';
      let orderConfirmLink = `http://${DOMAIN_HOST}/order/paymentConfirm?serial=${orderSerialNumber}`

      mailSendConfig.subject = sprintf(mailSendConfig.subject, { orderSerialNumber });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        ...result,
        orderSerialNumber,
        storeName: 'LFP',
        orderConfirmLink
      });

      mailSendConfig.type = 'orderConfirm';

      return mailSendConfig;

    } catch (error) {
      throw error;
    }

  },
  orderToShopConfirm: (result = {
    productName, serialNumber, email, username, bankId, bankName, bankName,
    accountId, accountName, paymentTotalAmount, shipmentUsername, shipmentAddress,
    note, phone, invoiceNo
  }) => {

    try {

      let orderToShopConfirm = sails.config.mail.templete.orderToShopConfirm;
      let mailSendConfig = {...orderToShopConfirm, to: result.email};
      let orderSerialNumber = result.serialNumber;
      let DOMAIN_HOST = process.env.DOMAIN_HOST || 'localhost:5001';
      let orderConfirmLink = `http://${DOMAIN_HOST}/order/paymentConfirm?serial=${orderSerialNumber}`

      mailSendConfig.subject = sprintf(mailSendConfig.subject, { orderSerialNumber });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        ...result,
        orderSerialNumber,
        storeName: 'LFP',
        orderConfirmLink
      });

      mailSendConfig.type = 'orderConfirm';

      return mailSendConfig;

    } catch (error) {
      throw error;
    }

  },
  orderSync: (user, host) => {

    try {
      var orderSyncTemplete = sails.config.mail.templete.orderSync;
      var email = user.email;
      var mailSendConfig = {...orderSyncTemplete, to: email};

      var addr = 'localhost';
      var port = sails.config.port;

      var syncLinkHost = host || `/api/order/status`
      var syncLinkParams = `token=${user.orderSyncToken}`
      var syncLink = `${syncLinkHost}?${syncLinkParams}`

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {email});
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        syncLink,
        email,
        storeName: 'LFP',
        username: user.username
      });

      mailSendConfig.type = 'orderSync';

      return {...mailSendConfig, syncLink, syncLinkHost, syncLinkParams};

    } catch (e) {
      throw error;
    }

  },
  paymentConfirm: (order = {
    email, serialNumber, username
  }) => {
    try {

      var paymentConfirmTemplete = sails.config.mail.templete.paymentConfirm;
      var mailSendConfig = {...paymentConfirmTemplete, to: order.email};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {orderSerialNumber: order.serialNumber});
      mailSendConfig.text = sprintf(mailSendConfig.text, {
        storeName: 'LFP',
        username: order.username
      });

      mailSendConfig.type = 'paymentConfirm';

      return mailSendConfig;
    } catch (e) {
      throw e;
    }



  },
  deliveryConfirm: (order) => {

    try {
      var deliveryConfirmTemplete = sails.config.mail.templete.deliveryConfirm;
      var mailSendConfig = {...deliveryConfirmTemplete, to: order.User.email};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {orderSerialNumber: order.serialNumber});
      mailSendConfig.text = sprintf(mailSendConfig.text, {
        storeName: 'LFP',
        username: order.User.username
      });

      mailSendConfig.type = 'deliveryConfirm';
      return mailSendConfig;
    } catch (e) {
      throw e;
    }

  },
  forgotPassword: ({username, api, email}) => {
    try {
      let forgotPasswordTemplete = sails.config.mail.templete.forgotPassword;
      let mailSendConfig = {...forgotPasswordTemplete, to: email};
      let DOMAIN_HOST = sails.config.appUrl;
      const url = `${DOMAIN_HOST}${api}`

      mailSendConfig.subject = sprintf(mailSendConfig.subject, { username });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        username,
        url,
        storeName: 'LFP',
      });

      mailSendConfig.type = 'forgotPassword';
      return mailSendConfig;
    } catch (e) {
      throw e;
    }
  },
  eventOrderConfirm: (result = {
    productName, serialNumber, email, username, bankId, bankName, bankName,
    accountId, accountName, paymentTotalAmount, shipmentUsername, shipmentAddress,
    note, phone
  }) => {

    try {

      let orderConfirmTemplete = sails.config.mail.templete.event.orderConfirm;
      let mailSendConfig = {...orderConfirmTemplete, to: result.email};
      let orderSerialNumber = result.serialNumber;

      mailSendConfig.subject = sprintf(mailSendConfig.subject, { orderSerialNumber });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        ...result,
        orderSerialNumber,
        storeName: 'LFP',
      });

      mailSendConfig.type = 'orderConfirm';

      return mailSendConfig;

    } catch (error) {
      throw error;
    }

  },
  eventPaymentConfirm: (order = {
    email, serialNumber, username
  }) => {
    try {

      var paymentConfirmTemplete = sails.config.mail.templete.event.paymentConfirm;
      var mailSendConfig = {...paymentConfirmTemplete, to: order.email};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {orderSerialNumber: order.serialNumber});
      mailSendConfig.text = sprintf(mailSendConfig.text, {
        storeName: 'LFP',
        username: order.username,
        orderSerialNumber: order.serialNumber
      });

      mailSendConfig.type = 'paymentConfirm';

      return mailSendConfig;
    } catch (e) {
      throw e;
    }
  },
  contactConfirm: ( result = {
    name, email, phone, subject, content, success
  }) => {
    try{
      let contactConfirmTemplete = sails.config.mail.templete.contact.Confirm;
      let mailSendConfig = {...contactConfirmTemplete, to: result.email};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        name: result.name,
        storeName: 'LFP'
      });
      mailSendConfig.html    = sprintf(mailSendConfig.html, {
        storeName: 'LFP',
        name: result.name,
        email: result.email,
        phone: result.phone,
        subject: result.subject,
        content: result.content
      });
      mailSendConfig.type = 'contact';
      mailSendConfig.success = result.success;
      return mailSendConfig;
    } catch (e) {
      throw e;
    }
  },
  contactSendToAdmin: ( result = {
    name, email, phone, subject, content, success
  }) => {
    try{
      let contactConfirmTemplete = sails.config.mail.templete.contact.SendToAdmin;
      let mailSendConfig = {...contactConfirmTemplete, to: 'info@labfnp.com'};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        name: result.name,
        storeName: 'LFP',
        subject: result.subject
      });
      mailSendConfig.html    = sprintf(mailSendConfig.html, {
        name: result.name,
        email: result.email,
        phone: result.phone,
        subject: result.subject,
        content: result.content
      });
      mailSendConfig.type = 'contact';
      mailSendConfig.success = result.success;
      return mailSendConfig;
    } catch (e) {
      throw e;
    }
  },

  checkNewEmail: ({username, api, email, type}) => {
    try {
      let checkEmailTemplete = sails.config.mail.templete.checkNewEmail;
      let mailSendConfig = {...checkEmailTemplete, to: email};
      let DOMAIN_HOST = sails.config.appUrl;
      const url = `${DOMAIN_HOST}${api}`

      mailSendConfig.subject = sprintf(mailSendConfig.subject, { username });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        type,
        username,
        url,
        storeName: 'LFP',
      });

      mailSendConfig.type = 'newEmail';
      return mailSendConfig;
    } catch (e) {
      throw e;
    }
  },

  sendMail: async (message) => {

    try {

      if(sails.config.environment === 'production'){

        await MailerService.send(message.toJSON());
        message.error = '';
      }
      else {
        message.error = 'test only';
      }
      message.success = true;

      await message.save();

    } catch (error) {
      console.error(error.stack);
      message.success = false;
      message.error = error.message;
      await message.save();

    }
  }

};
