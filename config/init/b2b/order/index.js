module.exports.init = async () => {
  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {
      const allpay = await Allpay.create({
        "TradeNo": "0000000000000000",
        "MerchantTradeNo": "a948749b",
        "RtnCode": 1,
        "RtnMsg": "付款成功",
        "PaymentDate": "2017-01-10 16:11:59",
        "TradeDate": "2017-01-01 16:10:21",
        "PaymentType": "ATM_TAISHIN",
        "ShouldTradeAmt": 999,
        "TradeAmt": 999,
        "BankCode": "812",
        "vAccount": "9966627013152469",
        "ExpireDate": "2017/01/30",
        "PaymentNo": null,
        "Barcode1": null,
        "Barcode2": null,
        "Barcode3": null,
        "CheckMacValue": null,
        "MerchantTradeDate": null,
      });
      const user = await User.create({
        username: 'testOrder',
        email: 'testOrder@example.com',
        firstName: '歐德',
        lastName: '泰'
      })

      const orderStatus = await OrderStatus.create({
        languageId: 0,
        name: 'NEW',
      });

      const order = await Order.create({
        "invoiceNo": 98765432,
        "invoicePrefix": "HI",
        "firstname": "歐德",
        "lastname": "泰",
        "email": "testOrder@example.com",
        "telephone": "0987654321",
        "fax": "0412345678",
        "customField": "",
        "paymentFirstname": "歐德",
        "paymentLastname": "泰",
        "paymentCompany": "",
        "paymentAddress1": "台灣城市的某個街道隨機號",
        "paymentAddress2": "",
        "paymentCity": "taichung",
        "paymentPostcode": "402",
        "paymentCountry": "",
        "paymentCountryId": 0,
        "paymentZone": "",
        "paymentZoneId": 0,
        "paymentAddressFormat": "",
        "paymentCustomField": "",
        "paymentMethod": "ATM",
        "paymentCode": "808080808080",
        "shippingFirstname": "歐德",
        "shippingLastname": "泰",
        "shippingCompany": "",
        "shippingAddress1": "台灣城市的某個街道隨機號",
        "shippingAddress2": "",
        "shippingCity": "taichung",
        "shippingPostcode": "402",
        "shippingCountry": "",
        "shippingCountryId": 0,
        "shippingZone": "",
        "shippingZoneId": 0,
        "shippingAddressFormat": "",
        "shippingCustomField": "",
        "shippingMethod": "郵局遞送",
        "shippingCode": "123456789009876",
        "comment": "no comment",
        "total": 123456,
        "commission": 0,
        "marketingId": 0,
        "tracking": "確認訂單",
        "languageId": 0,
        "ip": "",
        "forwardedIp": "",
        "userAgent": "",
        "acceptLanguage": "",
        "AllpayId": allpay.id,
        "UserId": user.id,
        "OrderStatusId": orderStatus.id
      });
    }
  } catch (e) {
    console.error(e);
  }
};
