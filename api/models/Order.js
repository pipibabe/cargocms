
module.exports = {
  attributes: {
    invoiceNo: {
      type: Sequelize.INTEGER(11),
      defaultValue: 0,
      allowNull: false,
    },
    invoicePrefix: {
      type: Sequelize.STRING(26),
      allowNull: false,
    },
    // 多商場功能
    // storeId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    // storeName: {
    //   type: Sequelize.STRING(64),
    //   allowNull: false,
    // },
    // storeUrl: {
    //   type: Sequelize.STRING(255),
    //   allowNull: false,
    // },

    // customerId、customerGroupId 可用於選擇客戶群體來打折產品
    // customerId: {
    //   type: Sequelize.INTEGER(11),
    //   defaultValue: 0,
    //   allowNull: false,
    // },
    // customerGroupId: {
    //   type: Sequelize.INTEGER(11),
    //   defaultValue: 0,
    //   allowNull: false,
    // },

    firstname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(96),
      allowNull: false,
    },
    telephone: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    fax: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    customField: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    paymentFirstname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    paymentLastname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    paymentCompany: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    paymentAddress1: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    paymentAddress2: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    paymentCity: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    paymentPostcode: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    paymentCountry: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    paymentCountryId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    paymentZone: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    paymentZoneId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    paymentAddressFormat: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    paymentCustomField: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    paymentMethod: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    paymentCode: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingFirstname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    shippingLastname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    shippingCompany: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    shippingAddress1: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingAddress2: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingCity: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingPostcode: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    shippingCountry: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingCountryId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    shippingZone: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingZoneId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    shippingAddressFormat: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    shippingCustomField: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    shippingMethod: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingCode: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    total: {
      type: Sequelize.DECIMAL(15,4),
      defaultValue: '0.000',
      allowNull: false,
    },

    // 聯盟
    // http://docs.opencart.com/marketing/affiliate/
    // affiliateId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    commission: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: false,
    },
    marketingId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    tracking: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    languageId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },

    // 貨幣
    // currencyId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    // currencyCode: {
    //   type: Sequelize.STRING(3),
    //   allowNull: false,
    // },
    // currencyValue: {
    //   type: Sequelize.DECIMAL(15, 8),
    //   defaultValue: '1.00000000',
    //   allowNull: false,
    // },

    ip: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    forwardedIp: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    userAgent: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    acceptLanguage: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  },
  associations: () => {
    Order.hasOne(OrderStatus);
    Order.hasOne(OrderOption);
    Order.hasOne(OrderProduct);
    Order.belongsTo(Allpay);
    Order.belongsTo(User);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
