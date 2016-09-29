import moment from 'moment';

module.exports = {
	attributes: {
		recipient: {
			type: Sequelize.STRING,
		},
		address: {
			type: Sequelize.STRING,
		},
		phone: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: true
		},
		note: {
			type: Sequelize.STRING,
			allowNull: true
		},
		remark: {
			type: Sequelize.STRING,
		},
    invoiceNo: {
      type: Sequelize.STRING,
    },
		ItemNameArray: {
			type: Sequelize.VIRTUAL,
			get: function () {
				try {
					const thisRecipe = this.getDataValue('Recipe');
					const recipe = thisRecipe ? [thisRecipe.perfumeName] : [];
					return recipe;
				} catch (e) {
					sails.log.error(e);
				}
			}
		},

		updatedAt: {
			type: Sequelize.DATE,
			get: function () {
				try {
					return moment(this.getDataValue('updatedAt')).format("YYYY/MM/DD HH:mm:SS");
				} catch (e) {
					sails.log.error(e);
				}
			}
		},

		createdAt: {
			type: Sequelize.DATE,
			get: function () {
				try {
					return moment(this.getDataValue('createdAt')).format("YYYY/MM/DD HH:mm:SS");
				} catch (e) {
					sails.log.error(e);
				}
			}
		},

	},
	associations: () => {
		RecipeOrder.belongsTo(User);
		RecipeOrder.belongsTo(Recipe);
		Allpay.belongsTo(RecipeOrder);
	},
	options: {
		classMethods: {
			findByIdHasJoin: async(id) => {
				try {
					return await RecipeOrder.findOne({
						where: {
							id
						},
						include: [User, Recipe]
					});
				} catch (e) {
					sails.log.error(e);
					throw e;
				}
			},
			deleteById: async(id) => {
				try {
					return await RecipeOrder.destroy({
						where: {
							id
						}
					});
				} catch (e) {
					sails.log.error(e);
					throw e;
				}
			},
		},
		instanceMethods: {},
		hooks: {}
	}
};
