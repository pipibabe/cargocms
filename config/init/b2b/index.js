import product from './product/index.js';
import order from './order/index.js';

module.exports.init = async function(){
  await product.init();
  await order.init();
}
