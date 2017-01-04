module.exports = {
  attributes: {

      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      model: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },

      quantity: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
      },

      price: {
        type: Sequelize.DECIMAL(15,4),
        allowNull: false,
      },

      total: {
        type: Sequelize.DECIMAL(15,4),
        allowNull: false,
      },

      tax: {
        type: Sequelize.DECIMAL(15,4),
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM("NEW", "PENDING", "RECEIVED", "REQUESTED", "SUBMITTED", "PAID", "PROCESSING", "CANCELLED", "SHIPPED", "DELIVERED", "COMPLETED"),
        allowNull: false,
        defaultValue: 'NEW'
      },
	},
	associations: () => {
    // SupplierShipOrderDescription.belongsTo(SupplierShipOrder);

  },
	options: {
		classMethods: {},
		instanceMethods: {},
		hooks: {}
	}
};
