module.exports = {

  find: async (req, res) => {
    try {
      const { query, method, body } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      const include = [ SupplierShipOrderProduct, Supplier ];
      const isPost = method === 'POST';
      let mServerSidePaging = isPost ? body.serverSidePaging : serverSidePaging;
      let mQuery = isPost ? body : query;
      let result;
      if (mServerSidePaging) {
        result = await PagingService.process({ query: mQuery, modelName, include });
      } else {
        const items = await sails.models[modelName].findAll({
          include
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
      const item = await SupplierShipOrder.findOne({
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
      const item = await SupplierShipOrder.create(data);
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
      const item = await SupplierShipOrder.update(data ,{
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
      const item = await SupplierShipOrder.destroy({ where: { id } });
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

      let findSupplierShipOrderProduct = await SupplierShipOrderProduct.findAll({
        where: {
          SupplierShipOrderId: id
        }
      });

      let checkSupplierShipOrderProductHasCOMPLETED = await SupplierShipOrderProduct.findAll({
        where: {
          SupplierShipOrderId: id,
          status: 'COMPLETED',
        }
      });
      if (checkSupplierShipOrderProductHasCOMPLETED.length > 0) {
        throw Error('已有商品揀貨完成，不能取消訂單');
      }

      let supplierShipOrderProductIdArray = findSupplierShipOrderProduct.map((prod) => {
        prod = prod.toJSON();
        return prod.id;
      })

      const updateSupplierShipOrderStatus = (transaction) => {
        return new Promise(function(resolve, reject) {
          SupplierShipOrder.update({ status },{ where: { id }}, { transaction })
          .then(function(updateSupplierShipOrder) {
            resolve(updateSupplierShipOrder);
          })
          .catch(function(err) {
            reject(err)
          });
        });
      }

      const updateSupplierShipOrderProductStatus = (status, transaction) => {
        return new Promise(function(resolve, reject) {
          SupplierShipOrderProduct.update({
            status
          }, {
            where: {
              id: supplierShipOrderProductIdArray
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
      .then(function (t) {
        transaction = t;
        return updateSupplierShipOrderStatus(transaction)
      })
      .then(function() {
        switch (status) {
          case 'PROCESSING':
            return updateSupplierShipOrderProductStatus('PROCESSING', transaction);
            break;
          case 'CANCELLED':
            return updateSupplierShipOrderProductStatus('CANCELLED', transaction);
            break;
          default:
            return updateSupplierShipOrderProductStatus('NEW', transaction);
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
