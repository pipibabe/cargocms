module.exports = {

  find: async (req, res) => {
    try {
      const { query } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      if (serverSidePaging) {
        const include = [];
        result = await PagingService.process({ query, modelName, include });
      } else {
        const items = await sails.models[modelName].findAll({
          include: []
        });
        result = { data: { items } };
      }
      res.ok(result);
    } catch (e) {
      res.serverError(e);
    }
  },

  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await SupplierShipOrderDescription.findOne({
        where:{
          id
        },
        include: []
      });
      res.ok({data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      let data = req.body;
      const item = await SupplierShipOrderDescription.create(data);
      let message = 'Create success.';
      res.ok({ message, data: { item } } );
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const message = 'Update success.';
      const item = await SupplierShipOrderDescription.update(data ,{
        where: { id, },
      });
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await SupplierShipOrderDescription.destroy({ where: { id } });
      let message = 'Delete success';
      res.ok({message, data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  },

  status: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const supplierShipOrderDescription = await SupplierShipOrderDescription.findById(id);

      const updateSupplierShipOrderDescriptionStatus = (transaction) => {
        return new Promise(function(resolve, reject) {
          SupplierShipOrderDescription.update({ status },{ where: { id }}, { transaction })
          .then(function(updateSupplierShipOrder) {
            resolve(updateSupplierShipOrder);
          })
          .catch(function(err) {
            reject(err)
          });
        });
      }

      const checkNotCompletedShipOrder = (transaction) => {
        return new Promise(function(resolve, reject) {
          SupplierShipOrderDescription.findAll({
            where: {
              SupplierShipOrderId: supplierShipOrderDescription.SupplierShipOrderId,
              status: {
                $in: ['NEW', 'PROCESSING']
              }
            }
          })
          .then(function(supplierShipOrderDescription) {
            resolve(supplierShipOrderDescription);
          })
          .catch(function(err) {
            reject(err)
          });
        });
      }

      const updateSupplierShipOrderStatus = (status, transaction) => {
        return new Promise(function(resolve, reject) {
        SupplierShipOrder.update({
          status
        }, {
          where: {
            id: supplierShipOrderDescription.SupplierShipOrderId
          }
        }, {transaction})
          .then(function(updateSupplierShipOrder) {
            resolve(updateSupplierShipOrder);
          })
          .catch(function(err) {
            reject(err)
          });
        });
      }

      const isolationLevel = sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE;
      let transaction;
      return sequelize.transaction({ isolationLevel })
      .then(function(t) {
        transaction = t;
        return updateSupplierShipOrderDescriptionStatus(transaction)
      })
      .then(function() {
        return checkNotCompletedShipOrder(transaction)
      })
      .then(function(supplierShipOrderDescription) {
        if (supplierShipOrderDescription.length <= 0) {
          return updateSupplierShipOrderStatus('COMPLETED', transaction)
        }
      })
      .then(function(){
        transaction.commit();
        let message = 'update status success';
        return res.ok({ message });
      })
      .catch(function(err) {
        sails.log.error('更新狀態失敗', err.toString());
        transaction.rollback();
        return res.serverError(err);
      });
    } catch (e) {
      res.serverError(e);
    }
  },
}
