module.exports = {
	attributes: {

		invoiceNo: {
			type: Sequelize.STRING(48),
			allowNull: false
		},

		invoicePrefix: {
			type: Sequelize.STRING(26),
			allowNull: false
		},

		firstname: {
			type: Sequelize.STRING(32),
			allowNull: false
		},

		lastname: {
			type: Sequelize.STRING(32),
			allowNull: false
		},

		email: {
			type: Sequelize.STRING(96),
			allowNull: false
		},

		telephone: {
			type: Sequelize.STRING(32),
			allowNull: false
		},

		fax: {
			type: Sequelize.STRING(32),
			allowNull: false
		},

		customField: {
			type: Sequelize.STRING(255),
			allowNull: false
		},

		paymentFirstname: {
			type: Sequelize.STRING(32),
			allowNull: false
		},

		paymentLastname: {
			type: Sequelize.STRING(32),
			allowNull: false
		},

		paymentCompany: {
			type: Sequelize.STRING(60),
			allowNull: false
		},

		paymentAddress1: {
			type: Sequelize.STRING(128),
			allowNull: false
		},

		paymentAddress2: {
			type: Sequelize.STRING,
			allowNull: false
		},

		paymentCity: {
			type: Sequelize.STRING(128),
			allowNull: false
		},

		paymentPostcode: {
			type: Sequelize.STRING(10),
			allowNull: false
		},

		paymentCountry: {
			type: Sequelize.STRING(128),
			allowNull: false
		},

		paymentCountryId: {
			type: Sequelize.STRING(11),
			allowNull: false
		},

		paymentZone: {
			type: Sequelize.STRING(128),
			allowNull: false
		},

		paymentZoneId: {
			type: Sequelize.STRING(11),
			allowNull: false
		},

		paymentAddressFormat: {
			type: Sequelize.STRING(255),
			allowNull: false
		},

		paymentCustomField: {
			type: Sequelize.STRING(255),
			allowNull: false
		},

		paymentMethod: {
			type: Sequelize.STRING(128),
			allowNull: false
		},

		paymentCode: {
			type: Sequelize.STRING(128),
			allowNull: false
		},

		shippingFirstname: {
			type: Sequelize.STRING(32),
			allowNull: false
		},

		shippingLastname: {
			type: Sequelize.STRING(32),
			allowNull: false
		},

		shippingCompany: {
			type: Sequelize.STRING(40),
			allowNull: false
		},

		shippingAddress1: {
			type: Sequelize.STRING(128),
			allowNull: false
		},

		shippingAddress2: {
			type: Sequelize.STRING(128),
			allowNull: false
		},

		shippingCity: {
			type: Sequelize.STRING,
			allowNull: false
		},

		shippingPostcode: {
			type: Sequelize.STRING(10),
			allowNull: false
		},

		shippingCountry: {
			type: Sequelize.STRING(128),
			allowNull: false
		},

		shippingCountryId: {
			type: Sequelize.STRING(11),
			allowNull: false
		},

		shippingZone: {
			type: Sequelize.STRING(128),
			allowNull: false
		},

		shippingZoneId: {
			type: Sequelize.STRING(11),
			allowNull: false
		},

		shippingAddressFormat: {
			type: Sequelize.STRING(255),
			allowNull: false
		},

		shippingCustomField: {
			type: Sequelize.STRING(255),
			allowNull: false
		},

		shippingMethod: {
			type: Sequelize.STRING(128),
			allowNull: false
		},

		shippingCode: {
			type: Sequelize.STRING(128),
			allowNull: false
		},

		comment: {
			type: Sequelize.STRING(255),
			allowNull: false
		},

		total: {
			type: Sequelize.DECIMAL(15, 4),
			allowNull: false
		},

		commission: {
			type: Sequelize.DECIMAL(15, 4),
			allowNull: false
		},

		tracking: {
			type: Sequelize.STRING(64),
			allowNull: false
		},

		ip: {
			type: Sequelize.STRING(40),
			allowNull: false
		},

		forwardedIp: {
			type: Sequelize.STRING(40),
			allowNull: false
		},

		userAgent: {
			type: Sequelize.STRING(255),
			allowNull: false
		},

		acceptLanguage: {
			type: Sequelize.STRING(255),
			allowNull: false
		},

		status: {
      type: Sequelize.ENUM('NEW','PAID','PROCESSING','SHIPPED','DELIVERED','CANCELLED','COMPLETED', 'SUBMITTED','DENIED','CANCELED REVERSAL','FAILED','REFUNDED','REVERSED','CHARGEBACK','PENDING','VOIDED','PROCESSED','EXPIRED'),
      allowNull: false,
      defaultValue: 'NEW'
		},

		createdDateTime: {
			type: Sequelize.VIRTUAL,
			get: function() {
				try {
					return UtilsService.DataTimeFormat(this.getDataValue('createdAt'));
				} catch (e) {
					sails.log.error(e);
				}
			}
		},

		updatedDateTime: {
			type: Sequelize.VIRTUAL,
			get: function() {
				try {
					return UtilsService.DataTimeFormat(this.getDataValue('updatedAt'));
				} catch (e) {
					sails.log.error(e);
				}
			}
		},

		displayName: {
			type: Sequelize.VIRTUAL,
			get: function() {
				try {
					return this.getDataValue('lastname') + this.getDataValue('firstname');
				} catch (e) {
					sails.log.error(e);
				}
			}
		}

	},
	associations: () => {
		// SupplierShipOrder.hasMany(SupplierShipOrderDescription);
		SupplierShipOrder.belongsTo(Supplier);
		SupplierShipOrder.belongsTo(Order);
    SupplierShipOrder.hasMany(SupplierShipOrderProduct);
    SupplierShipOrder.hasMany(SupplierShipOrderHistory);
	},
	options: {
		classMethods: {},
		instanceMethods: {},
		hooks: {}
	}
};
