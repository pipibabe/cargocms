/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = async (cb) => {

  // 這個已經用 config/urls.js 定義預設值
  //if(!sails.config.urls) sails.config.urls = {afterSignIn: "/"};

  console.log("=== Setup express-helpers ===");
  _.extend(sails.hooks.http.app.locals, sails.config.http.locals);

  let porductionInitDb = async () => {
    let {connection} = sails.config.models;
    let {environment} = sails.config;

    if(connection == 'mysql' && environment == 'production'){

      let {database} = sails.config.connections.mysql;

      let tableList = await sequelize.query(`
        select table_name
        from information_schema.tables
        where table_schema='${database}';
      `);

      if(tableList[0].length == 0){
        sails.log.info("=== porduction init database ===");
        await sequelize.sync({ force: 'drop' });
      }
    }
  }

  try {

    sails.log.info("=== start bootstrap ===");
    sails.services.passport.loadStrategies();

    await porductionInitDb();

    let adminRole = await Role.findOrCreate({
      where: {authority: 'admin'},
      defaults: {authority: 'admin'}
    });

    let userRole = await Role.findOrCreate({
      where: {authority: 'user'},
      defaults: {authority: 'user'}
    });

    User.create({
      username: 'user',
      email: 'user@example.com',
      firstName: '王',
      lastName: '大明'
    }).then(function(user) {
      Passport.create({
        provider: 'local',
        password: 'user',
        UserId: user.id
      });



    });



    User.findOrCreate({
      where: {
        username: 'admin'
      },
      defaults: {
        username: 'admin',
        email: 'admin@example.com',
        firstName: '管',
        lastName: '李仁'
      }
    }).then(function(adminUsers) {
      Passport.findOrCreate({
        where: {
          provider: 'local',
          UserId: adminUsers[0].id
        },
        defaults: {
          provider: 'local',
          password: 'admin',
          UserId: adminUsers[0].id
        }
      });
      //adminUsers[0].addRole(adminRole[0]);
    });

    const {environment} = sails.config;

    if (environment === 'development' && sails.config.models.migrate == 'drop') {
      sails.log.info("init Dev data", environment);


      // 大量假帳號
      require('./init/fakeusers').init();

      await Post.create({
        title: '自造者世代（MAKERS）與第三次工業革命',
        content: '<p class="lead">自造者世代的興起源自於網路、科技的進步與每個人渴望參與創造的特質，人們開始了解到知識的傳遞與以開放的內心學習不同知識、跨領域的結合之重要性。</p><p>因此近年開展出了，被稱為『第三次工業革命的機會』，則是一個新的工業化思維，並闡述人們開始從原來產品的使用者轉為產品的設計者，且發現到實際上自己參與實作並沒那麼難。讓過去被認為是所謂的休閒嗜好之活動，反而創造出原本不被想像的價值，以打破過去工業化時代大量化製造的障礙，以群募得方式找到某一特定群體所關注的議題，並實現此群體共同的想像。</p><blockquote>『第三次工業革命的機會』，這會是我們大家的機會，一個群體共創價值的時代，不僅只是透過3D printer此類型工具做表象上的改變，同時更是在每個人的思維上都增添了不同創作力的想像！</blockquote>',
        coverType: 'video',
        coverUrl: 'https://www.youtube.com/embed/VREirE8afgg',
        url: 'http://localhost:5001/blog/flower',
        abstract: '自造者世代的興起源自於網路、科技的進步與每個人渴望參與創造的特質，人們開始了解到知識的傳遞與以開放的內心學習不同知識、跨領域的結合之重要性。',
        UserId: 1,
      });

      const image = await Image.create({
        filePath: 'http://www.labfnp.com/modules/core/img/update1.jpg',
        type: 'image/jpeg',
        storage: 'url',
      });

      const post = await Post.create({
        title: '香味的一沙一世界5',
        content: '<p>我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材（ex:玫瑰、康乃馨..等)所組成的『這束花的味道』，接著抽出其中的一朵康乃馨，聞到的則是這『一朵康乃馨的味道』，而事實上，若深入去探究此康乃馨的氣味組成，則可小到香味分子的程度：花香由多種香味分子所組成。而這樣的組成就像香水、香料以及香味分子的不同級距來看，香水聞起來是一種味道而細究卻是多種香味分子的組成。</p><p>或許你會以為我們跟台北火車站、天水街的化工行在做一樣的，但實際上，於過去台灣可以找到的香味素材，大多皆已被調好的香精，而這些香精的比例對於供應商來說時常被視為商業機密，所以當你選用了某一供應商所調製的香精時很難了解到其內容組成，而為了調出一樣的味道，你只能持續的跟他買香精、香料。這樣的環境下，對於調香創作的自由度與香味分子本質掌握、認識的程度就會變得非常的低，而LFP秉持著期望每個創作者都可以實際了解香味分子的感受，才能從本質上自主選擇。</p>',
        cover: image.id,
        url: 'http://localhost:5001/blog/flower',
        abstract: '我們可以這樣形容，當你手中捧到一束花時，可以聞到花束中的各種花材（ex:玫瑰、康乃馨..等)所組成的『這束花的味道』，接著抽出其中的一朵康乃馨，聞到的則是這『一朵康乃馨的味道』，而事實上，若深入去探究此康乃馨的氣味組成，則可小到香味分子的程度：花香由多種香味分子所組成。而這樣的組成就像香水、香料以及香味分子的不同級距來看，香水聞起來是一種味道而細究卻是多種香味分子的組成',
        UserId: 1,
      });

      const tag = await Tag.create({
        title: '花'
      });

      await post.addTag(tag.id);

      const recipeLove = {
        formula:[
          {"drops":"1","scent":"BA69","color":"#E87728"},
          {"drops":"2","scent":"BA70","color":"#B35721"}
        ],
        formulaLogs: '',
        authorName: '王大明',
        perfumeName: 'love',
        message: 'this is love',
        UserId: 1,
      }
      Recipe.create(recipeLove);

      const recipeLoveAgain = {
        formula:[
          {"drops":"1","scent":"BA69","color":"#E87728"},
          {"drops":"2","scent":"BA70","color":"#B35721"}
        ],
        formulaLogs: '',
        authorName: '王大明',
        perfumeName: 'love again',
        message: 'this is love again',
        UserId: 1,
      };

      let testRecipe = await Recipe.create(recipeLoveAgain);


      // const execSync = require('child_process').execSync;
      // execSync(`sqlite3 ${__dirname}/../sqlite.db < ${__dirname}/../import/scentNote.sql`);
      // execSync(`sqlite3 ${__dirname}/../sqlite.db < ${__dirname}/../import/scent.sql`);
      // execSync(`sqlite3 ${__dirname}/../sqlite.db < ${__dirname}/../import/feeling.sql`);

      // let path = "";
      // await ScentNote.importFeelingFromFile({path});
    }

    // import site-specified data
    require('./init/labfnp').init();

    cb();
  } catch (e) {
    console.error(e);
    cb(e);
  }
};
