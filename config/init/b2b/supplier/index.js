module.exports.init = async () => {
  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {
      // const supplier = await Supplier.create({
      //   name: '壹陸捌活海產',
      //   email: '168_seafood@gmail.com',
      //   telephone: '(04)-2201-1688',
      //   fax: '(04)-2201-1168',
      //   address: '台中市清水區北提路'
      // });

      const supplier = await Supplier.findAll();
      // supplier 關聯 admin 使用者
      await User.update({
        SupplierId: supplier[0].id
      },{
        where: {
          username: 'admin'
        }
      });

      await User.update({
        SupplierId: supplier[1].id
      },{
        where: {
          username: 'admin2'
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
};
