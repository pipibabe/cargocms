import customConfigLoader from './util/customConfigLoader.js';
var customConfig = customConfigLoader('mail.js');

var defaultConfig = {
  type: 'smtp',
  config: {
    from: '',
    provider: {
      host: '',
      auth: {
        user: '',
        pass: '',
      }
    }
  },
  templete: {
    orderConfirm: {
      sendBy: 'email',
      subject: '訂單 %(orderSerialNumber)s 建立完成',
      html: `<html><body>
      <br />Hi %(username)s:

      <br />感謝你的訂購，你所購買的產品 %(productName)s 已訂購完成
      <br />訂單編號為： %(orderSerialNumber)s
      <br />收件者為： %(shipmentUsername)s
      <br />收件者電話： %(phone)s
      <br />收件地址為： %(shipmentAddress)s
      <br />備註： %(note)s
      <br />發票號碼： %(invoiceNo)s
      <br />
      <br />如果上述資料正確，請將款項 $ %(paymentTotalAmount)s 匯款至以下帳號：
      <br />
      <br />銀行名稱： %(bankName)s
      <br />銀行代碼： %(bankId)s
      <br />帳號： %(accountId)s
      <br />匯款金額： $ %(paymentTotalAmount)s
      <br />匯款期限： %(expireDate)s
      <br />
      <br />From %(storeName)s
      </body></html>`
    },
    orderToShopConfirm: {
      sendBy: 'email',
      subject: '訂單 %(orderSerialNumber)s 建立完成',
      html: `<html><body>
      <br />Hi %(username)s:

      <br />感謝你的訂購，你所購買的產品 %(productName)s 已訂購完成
      <br />訂單編號為： %(orderSerialNumber)s
      <br />收件者為： %(shipmentUsername)s
      <br />收件者電話： %(phone)s
      <br />收件地址為： %(shipmentAddress)s
      <br />備註： %(note)s
      <br />發票號碼： %(invoiceNo)s
      <br />
      <br />From %(storeName)s
      </body></html>`
    },
    paymentConfirm: {
      sendBy: 'email',
      subject: '訂單 %(orderSerialNumber)s 已確認付款完成',
      text: `
      Hi %(username)s:

      您的付款已經確認，
      我們會盡快為您安排出貨事宜。

      From %(storeName)s
      `
    },
    deliveryConfirm: {
      sendBy: 'email',
      subject: '訂單 %(orderSerialNumber)s 已完成出貨',
      text: `
      Hi %(username)s:

      商品已出貨完成

      感謝你的訂購

      From %(storeName)s
      `
    },
    orderSync: {
      sendBy: 'email',
      subject: '使用者 email %(email)s 訂單查詢要求連結',
      html: `
      <br />Hi %(username)s:

      <br />請點選下列連結取得訂單資訊

      <br /><a href='%(syncLink)s'>取得訂單資訊</a>


      <br />From %(storeName)s
      `
    },
    greeting: {
      sendBy: 'email',
      subject: '歡迎 %(username)s 加入ＯＯＯ會員',
      html: `
      <p>歡迎 %(username)s 註冊 %(storeName)s ！</p>
      `
    },
    forgotPassword: {
      sendBy: 'email',
      subject: '%(username)s - 忘記密碼通知信',
      html: `
      <br />Hi %(username)s:
      <br />
      <br />是您在我們的系統中忘記密碼了嗎??
      <br />若是您忘記了密碼，點選以下連結即可重置密碼
      <br /><a href='%(url)s'>Click Me</a>
      <br />
      <br />若無法點擊連結，請複製下方連結至瀏覽器中
      <br />
      <br />%(url)s
      <br />
      <br />若不是您，您可以選擇忽略此封郵件。
      <br />
      <br />此為系統信件，請勿直接回覆此信件
      <br />From %(storeName)s
      `
    },
    checkNewEmail: {
      sendBy: 'email',
      subject: '%(username)s - 信箱驗證信',
      html: `
      <br />Hi %(username)s:
      <br />
      <br />我們接收到您的 email 修改申請, 請點擊下方的確認修改按鈕，以套用新的 email 設定。
      <br /><a href='%(url)s'>Click Me</a>
      <br />
      <br />若無法點擊連結，請複製下方連結至瀏覽器中
      <br />
      <br />%(url)s
      <br />
      <br />若不是您，您可以選擇忽略此封郵件。
      <br />
      <br />此為系統信件，請勿直接回覆此信件
      <br />From %(storeName)s
      `
    },
    event : {
      orderConfirm: {
        sendBy: 'email',
        subject: '訂單 %(orderSerialNumber)s 建立完成',
        html: `<html><body>
        <br />Hi %(username)s:

        <br />感謝你的訂購，你所購買的票卷 %(productName)s 已訂購完成
        <br />訂單編號為： %(orderSerialNumber)s
        <br />聯繫姓名： %(shipmentUsername)s
        <br />聯繫電話： %(phone)s
        <br />聯繫地址： %(shipmentAddress)s
        <br />備註： %(note)s
        <br />
        <br />如果上述資料正確，請將款項 $ %(paymentTotalAmount)s 匯款至以下帳號：
        <br />
        <br />銀行名稱： %(bankName)s
        <br />銀行代碼： %(bankId)s
        <br />帳號： %(accountId)s
        <br />匯款金額： $ %(paymentTotalAmount)s
        <br />匯款期限： %(expireDate)s
        <br />
        <br />From %(storeName)s
        </body></html>`
      },
      paymentConfirm: {
        sendBy: 'email',
        subject: '訂單 %(orderSerialNumber)s 已確認付款完成',
        text: `
        Hi %(username)s:

        您的付款已經確認，
        請記得在時間內報到
        並出示此 Email
        訂單編號為： %(orderSerialNumber)s

        From %(storeName)s
        `
      },
    },
    contact:{
      Confirm: {
        sendBy: 'email',
        subject: '%(name)s 感謝您，您訊息已成功送出',
        html: `<html><body>
        <br /><p>Hi %(name)s :</p>
        <br />
        <br />您的聯繫內容：
        <br /><p> 聯絡 Email：%(email)s </p>
        <br /><p> 聯絡電話：%(phone)s </p>
        <br /><p> 問題主旨：%(subject)s </p>
        <br /><p> 問題內容：%(content)s </p>
        <br />
        <br /><p>我們將會盡快與您聯繫，謝謝</p>
        <br />
        <br />此為系統信件，請勿直接回覆此信件
        <br />
        <br />From %(storeName)s
        </body></html>
        `
      },
      SendToAdmin:{
        sendBy: 'email',
        subject: '%(storeName)s 客戶 %(name)s 詢問了 %(subject)s',
        html: `<html><body>
        <br /><p>客戶 %(name)s 聯繫 LFP ！</p>
        <br />
        <br />聯繫內容：
        <br /><p> 客戶名稱：%(name)s </p>
        <br /><p> 客戶 Email：%(email)s </p>
        <br /><p> 客戶聯絡電話：%(phone)s </p>
        <br /><p> 客戶問題主旨：%(subject)s </p>
        <br /><p> 客戶問題內容：%(content)s </p>
        <br />
        <br />此為系統信件，請勿直接回覆此信件
        <br />
        </body></html>
        `
      }
    }
  }
}

module.exports.mail = {
  ...defaultConfig,
  ...customConfig
}
