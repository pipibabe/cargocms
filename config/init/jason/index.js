//
// const ScentNoteData = require('./data/ScentNote');
// const ScentData = require('./data/Scent');
// const ScentDetail = require('./data/ScentDetail.json');
// const FeelingData = require('./data/Feeling');

module.exports.init = async () => {
  try {
    const {environment} = sails.config;

    sails.log.debug('>>>> config/init/labfnp >>>>');

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

    let post = await Post.create({
      title: '自造者世代（MAKERS）與第三次工業革命',
      content: '<p class="lead">自造者世代的興起源自於網路、科技的進步與每個人渴望參與創造的特質，人們開始了解到知識的傳遞與以開放的內心學習不同知識、跨領域的結合之重要性。</p><p>因此近年開展出了，被稱為『第三次工業革命的機會』，則是一個新的工業化思維，並闡述人們開始從原來產品的使用者轉為產品的設計者，且發現到實際上自己參與實作並沒那麼難。讓過去被認為是所謂的休閒嗜好之活動，反而創造出原本不被想像的價值，以打破過去工業化時代大量化製造的障礙，以群募得方式找到某一特定群體所關注的議題，並實現此群體共同的想像。</p><blockquote>『第三次工業革命的機會』，這會是我們大家的機會，一個群體共創價值的時代，不僅只是透過3D printer此類型工具做表象上的改變，同時更是在每個人的思維上都增添了不同創作力的想像！</blockquote>',
      coverType: 'video',
      coverUrl: 'https://www.youtube.com/embed/VREirE8afgg',
      url: 'http://localhost:5001/blog/flower',
      abstract: '自造者世代的興起源自於網路、科技的進步與每個人渴望參與創造的特質，人們開始了解到知識的傳遞與以開放的內心學習不同知識、跨領域的結合之重要性。',
      GroupId: 1
    });
    const newProduct = await Product.create({
      title: '90度推開式自動門 單扇/雙扇',
      specification: 'DC-380-1R / DC-380-2R',
      introduction: 'a door',
      PostId: post.id,
    });

    post = await Post.create({
      title: '自造者世代（MAKERS）與第三次工業革命',
      content: '<p class="lead">自造者世代的興起源自於網路、科技的進步與每個人渴望參與創造的特質，人們開始了解到知識的傳遞與以開放的內心學習不同知識、跨領域的結合之重要性。</p><p>因此近年開展出了，被稱為『第三次工業革命的機會』，則是一個新的工業化思維，並闡述人們開始從原來產品的使用者轉為產品的設計者，且發現到實際上自己參與實作並沒那麼難。讓過去被認為是所謂的休閒嗜好之活動，反而創造出原本不被想像的價值，以打破過去工業化時代大量化製造的障礙，以群募得方式找到某一特定群體所關注的議題，並實現此群體共同的想像。</p><blockquote>『第三次工業革命的機會』，這會是我們大家的機會，一個群體共創價值的時代，不僅只是透過3D printer此類型工具做表象上的改變，同時更是在每個人的思維上都增添了不同創作力的想像！</blockquote>',
      coverType: 'video',
      coverUrl: 'https://www.youtube.com/embed/VREirE8afgg',
      url: 'http://localhost:5001/blog/flower',
      abstract: '自造者世代的興起源自於網路、科技的進步與每個人渴望參與創造的特質，人們開始了解到知識的傳遞與以開放的內心學習不同知識、跨領域的結合之重要性。',
      GroupId: 1
    });
    const newProduct2 = await Product.create({
      title: '180度推開式自動門 單扇/雙扇',
      specification: 'DC-388-1R / DC-388-2R',
      introduction: 'a door',
      PostId: post.id,
    });

    post = await Post.create({
      title: '自造者世代（MAKERS）與第三次工業革命',
      content: '<p class="lead">自造者世代的興起源自於網路、科技的進步與每個人渴望參與創造的特質，人們開始了解到知識的傳遞與以開放的內心學習不同知識、跨領域的結合之重要性。</p><p>因此近年開展出了，被稱為『第三次工業革命的機會』，則是一個新的工業化思維，並闡述人們開始從原來產品的使用者轉為產品的設計者，且發現到實際上自己參與實作並沒那麼難。讓過去被認為是所謂的休閒嗜好之活動，反而創造出原本不被想像的價值，以打破過去工業化時代大量化製造的障礙，以群募得方式找到某一特定群體所關注的議題，並實現此群體共同的想像。</p><blockquote>『第三次工業革命的機會』，這會是我們大家的機會，一個群體共創價值的時代，不僅只是透過3D printer此類型工具做表象上的改變，同時更是在每個人的思維上都增添了不同創作力的想像！</blockquote>',
      coverType: 'video',
      coverUrl: 'https://www.youtube.com/embed/VREirE8afgg',
      url: 'http://localhost:5001/blog/flower',
      abstract: '自造者世代的興起源自於網路、科技的進步與每個人渴望參與創造的特質，人們開始了解到知識的傳遞與以開放的內心學習不同知識、跨領域的結合之重要性。',
      GroupId: 2
    });
    const newProduct3 = await Product.create({
      title: '360度推開式自動門 單扇/雙扇',
      specification: 'DC-380-1R / DC-380-2R',
      introduction: 'a door',
      PostId: post.id,
    });



  } catch (e) {
    console.error(e);
  }
};
