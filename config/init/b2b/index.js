import product from './product/index.js';
import order from './order/index.js';
import orderProduct from './orderproduct/index.js';

module.exports.init = async function(){
  await product.init();
  await order.init();
  await orderProduct.init();
}
