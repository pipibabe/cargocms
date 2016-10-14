//
// const ScentNoteData = require('./data/ScentNote');
// const ScentData = require('./data/Scent');
// const ScentDetail = require('./data/ScentDetail.json');
// const FeelingData = require('./data/Feeling');
const products = require('./data/Product.json');
const parts = require('./data/Part.json');

module.exports.init = async () => {
  try {
    const {environment} = sails.config;

    sails.log.debug('>>>> config/init/jason >>>>');

    const productGroups = [
      {
        title: '輕型自動門機',
        name: '123',
        type: 'product',
      },{
        title: '中型自動門機',
        name: '123',
        type: 'product',
      },{
        title: '重型自動門機',
        name: '123',
        type: 'product',
      },{
        title: '重疊型自動門機',
        name: '123',
        type: 'product',
      },{
        title: '圓弧型自動門機',
        name: '123',
        type: 'product',
      }
    ];
    productGroups.map(async (item, i) => {
      item.sequence = i
      await Group.create(item);
    });

    const partGroups = ['無線觸摸開關', '紅外線感應器', '各式感應開關', '對照式安全光線', '感應卡機及電鎖', '自動門耗材', '免灌膠玻璃上下料'];
    partGroups.map(async (item, i) => {
      let newGroup = { title: item };
      newGroup.sequence = i;
      newGroup.name = '123';
      newGroup.type = 'part';
      await Group.create(newGroup);
    });

    products.rows.forEach((e) => {
      Post.createItem(Object.assign({}, e, { itemType: Product }))
    });

    parts.rows.forEach((e) => {
      Post.createItem(Object.assign({}, e, { itemType: Part }))
    });

  } catch (e) {
    console.error(e);
  }
};
