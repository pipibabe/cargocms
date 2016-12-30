import productCreateHelper from "./productCreateHelper.js"

module.exports.init = async () => {
  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {

      await productCreateHelper.create({ name:'鮮甜飽滿無毒益菌蝦', supplierName:'壹陸捌活海產', categoryType:'蝦子', categoryEng:'shrimp'});

      await productCreateHelper.create({ name:'鮮甜飽滿大扇貝', supplierName:'一尾活海鮮', categoryType:'貝殼干貝' , categoryEng:'mussel'});

      await productCreateHelper.create({ name:'綿密司目魚', supplierName:'鱻海鮮', categoryType:'司目魚', categoryEng:'milkfish'});

      await productCreateHelper.create({ name:'清甜透抽小卷', supplierName:'狠鮮海產', categoryType:'透抽小卷', categoryEng:'cuttlefish'});

    }

  } catch (e) {
    console.error(e);
  }
};
