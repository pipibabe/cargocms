import product from './product/index.js';
import supplier from './supplier/index.js';
import supplierShipOrder from './suppliershiporder/index.js';
import order from './order/index.js';
import orderProduct from './orderproduct/index.js';
import orderPayment from './orderpayment/index.js';

module.exports.init = async function(){
  await supplier.init();
  await product.init();
  await order.init();
  await orderProduct.init();
  await supplierShipOrder.init();
  await orderPayment.init();
}
