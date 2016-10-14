//
// const ScentNoteData = require('./data/ScentNote');
// const ScentData = require('./data/Scent');
// const ScentDetail = require('./data/ScentDetail.json');
// const FeelingData = require('./data/Feeling');

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

    const products = [
      {
        title: '0度推開式自動門 單扇/雙扇',
        modelName: 'DC-388-1R / DC-388-2R',
        specification: 'DC-380-1R / DC-380-2R',
        introduction: 'a door',
        GroupId: 1
      },{
        title: '1度推開式自動門 單扇/雙扇',
        modelName: 'DC-388-1R / DC-388-2R',
        specification: 'DC-380-1R / DC-380-2R',
        introduction: 'a door',
        GroupId: 1
      },{
        title: '2度推開式自動門 單扇/雙扇',
        modelName: 'DC-388-1R / DC-388-2R',
        specification: 'DC-380-1R / DC-380-2R',
        introduction: 'a door',
        GroupId: 2
      },{
        title: '3度推開式自動門 單扇/雙扇',
        modelName: 'DC-388-1R / DC-388-2R',
        specification: 'DC-380-1R / DC-380-2R',
        introduction: 'a door',
        GroupId: 1
      },{
        title: '4度推開式自動門 單扇/雙扇',
        modelName: 'DC-388-1R / DC-388-2R',
        specification: 'DC-380-1R / DC-380-2R',
        introduction: 'a door',
        GroupId: 1
      },{
        title: '5度推開式自動門 單扇/雙扇',
        modelName: 'DC-388-1R / DC-388-2R',
        specification: 'DC-380-1R / DC-380-2R',
        introduction: 'a door',
        GroupId: 1
      },{
        title: '00度推開式自動門 單扇/雙扇',
        modelName: 'DC-388-1R / DC-388-2R',
        specification: 'DC-380-1R / DC-380-2R',
        introduction: 'a door',
        GroupId: 1
      },{
        title: '10度推開式自動門 單扇/雙扇',
        modelName: 'DC-388-1R / DC-388-2R',
        specification: 'DC-380-1R / DC-380-2R',
        introduction: 'a door',
        GroupId: 1
      },{
        title: '20度推開式自動門 單扇/雙扇',
        modelName: 'DC-388-1R / DC-388-2R',
        specification: 'DC-380-1R / DC-380-2R',
        introduction: 'a door',
        GroupId: 2
      },{
        title: '30度推開式自動門 單扇/雙扇',
        modelName: 'DC-388-1R / DC-388-2R',
        specification: 'DC-380-1R / DC-380-2R',
        introduction: 'a door',
        GroupId: 1
      },{
        title: '40度推開式自動門 單扇/雙扇',
        modelName: 'DC-388-1R / DC-388-2R',
        specification: 'DC-380-1R / DC-380-2R',
        introduction: 'a door',
        GroupId: 1
      },{
        title: '50度推開式自動門 單扇/雙扇',
        modelName: 'DC-388-1R / DC-388-2R',
        specification: 'DC-380-1R / DC-380-2R',
        introduction: 'a door',
        GroupId: 1
      }
    ];

    products.forEach((e) => {
      Post.createProduct(e)
    });

  } catch (e) {
    console.error(e);
  }
};
