import productCreateHelper from "./productCreateHelper.js"

module.exports.init = async () => {
  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {

      await productCreateHelper.create('鮮甜飽滿無毒益菌蝦','壹陸捌活海產', '蝦子', 'shrimp');

      await productCreateHelper.create('鮮甜飽滿大扇貝','一尾活海鮮', '貝殼干貝' , 'mussel');

      await productCreateHelper.create('綿密司目魚','鱻海鮮', '司目魚','milkfish');

      await productCreateHelper.create('清甜透抽小卷','狠鮮海產', '透抽小卷','cuttlefish');

    }

  } catch (e) {
    console.error(e);
  }
};
