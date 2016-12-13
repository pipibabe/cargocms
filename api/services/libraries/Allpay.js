import util from 'util';
import crypto from 'crypto';
import _ from 'lodash';
import moment from 'moment';

export default class Allpay {
  constructor({
      allpayModel,
      merchantID,
      hashKey,
      hashIV,
      prod = false,
      debug = true,
      ReturnURL,
      ClientBackURL,
      PaymentInfoURL,
      domain,
    }) {
    this.merchantID = merchantID;
    this.hashKey = hashKey;
    this.hashIV = hashIV;
    this.debug = debug;
    this.prod = prod;
    this.AioCheckOut = debug ? 'https://payment-stage.allpay.com.tw/Cashier/AioCheckOut' :
    'https://payment.allpay.com.tw/Cashier/AioCheckOut';
    this.ReturnURL = ReturnURL;
    this.ClientBackURL = ClientBackURL;
    this.PaymentInfoURL = PaymentInfoURL;
    this.Allpay = allpayModel;
    this.domain = domain;
  }

  genCheckMacValue(data) {
    // 若有 CheckMacValue 則先移除
    if (data.hasOwnProperty('CheckMacValue')) {
      delete data.CheckMacValue;
    }

    // 使用物件 key 排序資料
    const keys = Object.keys(data);
    const sortedKeys = _.sortBy(keys, (key) => key);
    let uri = _.map(sortedKeys, (key) => `${key}=${data[key]}`).join('&');

    uri = util.format('HashKey=%s&%s&HashIV=%s', this.hashKey, uri, this.hashIV);
    uri = encodeURIComponent(uri);
    let regex;
    const find = ['%2d', '%5f', '%2e', '%21', '%2a', '%28', '%29', '%20'];
    const replace = ['-', '_', '.', '!', '*', '(', ')', '+'];
    for (let i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], 'g');
      uri = uri.replace(regex, replace[i]);
    }
    uri = uri.toLowerCase();
    const checksum = crypto.createHash('md5').update(uri).digest('hex').toUpperCase();
    data.CheckMacValue = checksum;
    return data;
  };

  async createAndgetAllpayConfigAsync({
    relatedKeyValue,
    MerchantTradeNo,
    tradeDesc,
    totalAmount,
    paymentMethod,
    itemArray,
    clientBackURL,
    returnURL,
    paymentInfoURL,
    transaction,
  }) {
    clientBackURL = clientBackURL || this.ClientBackURL;
    returnURL = returnURL || this.ReturnURL;
    paymentInfoURL = paymentInfoURL || this.PaymentInfoURL;
    const data = {
      MerchantID: this.merchantID,
      MerchantTradeNo,
      MerchantTradeDate: moment().format('YYYY/MM/DD HH:mm:ss'),
      PaymentType: 'aio',
      TotalAmount: totalAmount,
      TradeDesc: tradeDesc || 'none.',
      ItemName: itemArray ? itemArray.join('#') : '',
      ReturnURL: this.resolve(this.domain, returnURL, true),
      ChoosePayment: paymentMethod || 'ALL',
      ClientBackURL: `${this.resolve(this.domain, clientBackURL, true)}?t=${MerchantTradeNo}`,
      PaymentInfoURL: this.resolve(this.domain, this.PaymentInfoURL, true),
    };
    let allpay = await this.Allpay.create({
      ...relatedKeyValue,
      MerchantTradeNo: data.MerchantTradeNo,
      PaymentType: data.PaymentType,
    }, { transaction });
    return {
      config: this.genCheckMacValue(data),
      allpay
    }
  }

  createAndgetAllpayConfig({
    relatedKeyValue,
    MerchantTradeNo,
    tradeDesc,
    totalAmount,
    paymentMethod,
    itemArray,
    clientBackURL,
    returnURL,
    paymentInfoURL,
    transaction,
  }) {
    clientBackURL = clientBackURL || this.ClientBackURL;
    returnURL = returnURL || this.ReturnURL;
    paymentInfoURL = paymentInfoURL || this.PaymentInfoURL;
    const data = {
      MerchantID: this.merchantID,
      MerchantTradeNo,
      MerchantTradeDate: moment().format('YYYY/MM/DD HH:mm:ss'),
      PaymentType: 'aio',
      TotalAmount: totalAmount,
      TradeDesc: tradeDesc || 'none.',
      ItemName: itemArray ? itemArray.join('#') : '',
      ReturnURL: this.resolve(this.domain, returnURL, true),
      ChoosePayment: paymentMethod || 'ALL',
      ClientBackURL: `${this.resolve(this.domain, clientBackURL, true)}?t=${MerchantTradeNo}`,
      PaymentInfoURL: this.resolve(this.domain, this.PaymentInfoURL, true),
    };
    const config = this.genCheckMacValue(data)
    return this.Allpay.create({
      ...relatedKeyValue,
      MerchantTradeNo: data.MerchantTradeNo,
      PaymentType: data.PaymentType,
    }, { transaction }).then(function(allpay) {
      return {
        config,
        allpay
      }
    });
  }

  async paymentinfo(callBackData) {
    try {
      let allPayInfo = await this.check(callBackData);
      allPayInfo.TradeNo = callBackData.TradeNo;
      allPayInfo.RtnCode = callBackData.RtnCode;
      allPayInfo.RtnMsg = callBackData.RtnMsg;
      allPayInfo.PaymentType = callBackData.PaymentType;
      allPayInfo.TradeDate = callBackData.TradeDate;
      allPayInfo.ShouldTradeAmt = callBackData.TradeAmt;
      allPayInfo.ExpireDate = callBackData.ExpireDate;

      if (callBackData.BankCode) {
        allPayInfo.BankCode = callBackData.BankCode;
        allPayInfo.vAccount = callBackData.vAccount;
      }

      if (callBackData.PaymentNo) {
        allPayInfo.PaymentNo = callBackData.PaymentNo;
        allPayInfo.Barcode1 = callBackData.Barcode1;
        allPayInfo.Barcode2 = callBackData.Barcode2;
        allPayInfo.Barcode3 = callBackData.Barcode3;
      }
      allPayInfo = await allPayInfo.save();
      return allPayInfo;
    } catch (e) {
      throw e;
    }
  }

  async paid(callBackData) {
    try {
      let allPayInfo = await this.check(callBackData);
      allPayInfo.TradeNo = callBackData.TradeNo;
      allPayInfo.TradeAmt = callBackData.TradeAmt;
      allPayInfo.RtnCode = callBackData.RtnCode;
      allPayInfo.RtnMsg = callBackData.RtnMsg;
      allPayInfo.PaymentType = callBackData.PaymentType;
      allPayInfo.PaymentDate = callBackData.PaymentDate;
      allPayInfo = await allPayInfo.save();
      return allPayInfo;
    } catch (e) {
      throw e;
    }
  }

  async check(callBackData) {
    try {
      const callBackCheckMacValue = callBackData.CheckMacValue;
      const data = this.genCheckMacValue(callBackData);
      if (this.prod) {
        if (data.CheckMacValue !== callBackCheckMacValue) {
          throw new Error('CheckMacError!!');
        }
      }
      const findAllpayInfo = await this.Allpay.findOne({
        where: {
          MerchantTradeNo: callBackData.MerchantTradeNo,
        },
      });
      if (!findAllpayInfo) {
        throw new Error(`${callBackData.MerchantTradeNo} 嚴重錯誤!!付款後找不到訂單!!`);
      }
      // if (findAllpayInfo.ShouldTradeAmt !== callBackData.TradeAmt) {
      //   throw new Error(`${callBackData.MerchantTradeNo} 嚴重錯誤!!金額錯誤!!`);
      // }
      return findAllpayInfo;
    } catch (e) {
      throw e;
    }
  }

  getPostUrl() {
    return this.AioCheckOut;
  }

  resolve(domain, path, absolute = false) {
    let result =
      absolute ?
        domain || process.env.domain || 'http://localhost:1337' :
        '';

    if (result.slice(1) !== '/' && path.indexOf('/') !== 0) {
      result += '/';
    }

    result += path;
    return result;
  }
}
