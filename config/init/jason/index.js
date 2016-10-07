//
// const ScentNoteData = require('./data/ScentNote');
// const ScentData = require('./data/Scent');
// const ScentDetail = require('./data/ScentDetail.json');
// const FeelingData = require('./data/Feeling');

module.exports.init = async () => {
  try {
    const {environment} = sails.config;

    sails.log.debug('>>>> config/init/labfnp >>>>');

    // const productGroups = [
    //   {
    //     title: '輕型自動門機',
    //     name: '123',
    //     type: 'product',
    //   },{
    //     title: '中型自動門機',
    //     name: '123',
    //     type: 'product',
    //   },{
    //     title: '重型自動門機',
    //     name: '123',
    //     type: 'product',
    //   },{
    //     title: '重疊型自動門機',
    //     name: '123',
    //     type: 'product',
    //   },{
    //     title: '圓弧型自動門機',
    //     name: '123',
    //     type: 'product',
    //   }
    // ];
    // productGroups.map((item, i) => {
    //   item.sequence = i
    //   Group.create(item);
    // });




  } catch (e) {
    console.error(e);
  }
};
