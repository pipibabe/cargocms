import productCreateHelper from "./productCreateHelper.js"

module.exports.init = async () => {
  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {

      await productCreateHelper.create({
        productNames:[
          '鮮甜飽滿無毒益菌蝦','生凍彈牙巨無霸大草蝦','挪威急凍保鮮北極甜蝦','巨無霸完美天使紅蝦',
          '野生極鮮特大斑節蝦','生凍規格特級無毒益菌蝦', '台灣產銷履歷無毒白蝦', '嚴選霸王級越南大草蝦',
          '格陵蘭鮮美北極甜蝦', '超級巨無霸海熊蝦之王'
        ],
        supplierName:'壹陸捌活海產',
        categoryType:'蝦子',
        categoryEng:'shrimp'
      });

      await productCreateHelper.create({
        productNames:[
          '鮮甜飽滿大扇貝', '正日本3S生食級鮮甜干貝', '嚴選美味鮮甜L大干貝' ,'北海道巨無霸生食干貝',
          '日本北海道新鮮大扇貝', '日本生食級超大干貝禮盒', '大顆彈牙鮮美甘甜帆立貝', '涮嘴帶勁好吃ㄟ鳳螺',
          '原裝巨無霸L干貝禮盒', '日本頂級超巨大廣島牡蠣'
        ],
        supplierName:'一尾活海鮮',
        categoryType:'貝殼干貝',
        categoryEng:'mussel'
      });

      await productCreateHelper.create({
        productNames:[
          '綿密司目魚','超鮮滑嫩無刺虱目魚肚', '超巨無霸整尾去刺虱目魚', '人工去刺虱目魚里肌肉',
          '豐富膠質虱目魚皮', '鮮Q虱目魚水餃', '特選大尾去刺虱目魚肚', '台南名產新鮮虱目魚香腸',
          '特選爆大去刺虱目魚肚', '大規格無刺虱目魚肚'
        ],
        supplierName:'鱻海鮮',
        categoryType:'司目魚',
        categoryEng:'milkfish'
      });

      await productCreateHelper.create({
        productNames:[
          '清甜透抽小卷', 'A級鮮嫩活凍透抽小卷','Q彈南方澳透抽切片','特A級鮮美活凍透抽',
          '巨無霸野生活凍大軟絲', '冰涼爽脆鮮凍澎湖冰卷', '台灣特鮮帶卵飽滿小卷', '巨無霸新鮮活凍透抽',
        ],
        supplierName:'狠鮮海產',
        categoryType:'透抽小卷',
        categoryEng:'cuttlefish'
      });


    }

  } catch (e) {
    console.error(e);
  }
};
