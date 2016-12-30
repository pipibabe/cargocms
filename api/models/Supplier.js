module.exports = {
	attributes: {

		name: {
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

		address: {
			type: Sequelize.STRING(255),
			allowNull: false
		}
	},
	associations: () => {
    Supplier.hasMany(SupplierShipOrder);
    Supplier.hasMany(Product);
    Supplier.hasMany(User);
  },
	options: {
		classMethods: {},
		instanceMethods: {},
		hooks: {}
	}
};
