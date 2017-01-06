module.exports.init = async () => {
  try {

    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {
      User.create({
        username: 'user',
        email: 'user@example.com',
        firstName: '大明',
        lastName: '王',
        birthday: new Date(),
        phone1: '(04)2201-9020',
        phone2: '0900-000-000',
        address: '西區台灣大道二段2號16F-1',
        address2: '台中市',
      }).then(function(user) {
        Passport.create({
          provider: 'local',
          password: 'user',
          UserId: user.id
        });
      });
    }

  } catch (e) {
    console.error(e);
  }
};
