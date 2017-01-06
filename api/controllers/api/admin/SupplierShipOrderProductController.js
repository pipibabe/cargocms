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
      const item = await SupplierShipOrderProduct.findOne({
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
      const item = await SupplierShipOrderProduct.create(data);
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
      const item = await SupplierShipOrderProduct.update(data ,{
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
      const item = await SupplierShipOrderProduct.destroy({ where: { id } });
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

      const supplierShipOrderProduct = await SupplierShipOrderProduct.findById(id);

      const updateSupplierShipOrderProductStatus = (transaction) => {
        return new Promise(function(resolve, reject) {
          SupplierShipOrderProduct.update({ status },{ where: { id }}, { transaction })
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
          SupplierShipOrderProduct.findAll({
            where: {
              SupplierShipOrderId: supplierShipOrderProduct.SupplierShipOrderId,
              status: {
                $in: ['NEW', 'PROCESSING']
              }
            }
          })
          .then(function(supplierShipOrderProduct) {
            resolve(supplierShipOrderProduct);
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
            id: supplierShipOrderProduct.SupplierShipOrderId
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
        return updateSupplierShipOrderProductStatus(transaction)
      })
      .then(function() {
        return checkNotCompletedShipOrder(transaction)
      })
      .then(function(supplierShipOrderProduct) {
        if (supplierShipOrderProduct.length <= 0) {
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
