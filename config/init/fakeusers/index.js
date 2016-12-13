import fetch from 'node-fetch';
import random_useragent from 'random-useragent';
import Chance from 'chance';

module.exports.init = async () => {

  const chance = new Chance();

  sails.log.info('create fake users');

  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';
    const isStressMode = process.env.TEST_MODE == "STRESS_E2E";

    if (isDevMode || isStressMode && isDropMode) {

      const amount = isStressMode ? "800" : "100";
      console.log("fake user amout" + amount);
      fetch('http://api.randomuser.me/?results='+amount)
      .then(function(res) {
        return res.json();
      })
      .then(function(json) {

        sails.log.info('api.randomuser.me data retrived');

        if (json.results) {
          for (var randomuser of json.results) {

            let userAgent = null;
            let lastLogin = null;
            let lastLoginIP = null;
            let lastLoginLat = null;
            let lastLoginLng = null;

            if (chance.bool({likelihood: 70})) {
              userAgent = random_useragent.getRandom();
              lastLogin = chance.date();
              lastLoginIP = chance.ip();
              lastLoginLat = chance.latitude();
              lastLoginLng = chance.longitude();
            }

            User.create({
              username: randomuser.login.username,
              email: randomuser.email,
              firstName: randomuser.name.first,
              lastName: randomuser.name.last,
              avatar: randomuser.picture.large,
              avatarThumb: randomuser.picture.thumbnail,
              phone1: randomuser.cell,
              phone2: randomuser.phone,
              address: randomuser.location.street,
              address2: randomuser.location.city + ', ' + randomuser.location.state,
              birthday: randomuser.dob,
              lastLogin,
              lastLoginIP,
              lastLoginLat,
              lastLoginLng,
              userAgent,
            }).then(function(user) {
              Passport.create({
                provider: 'local',
                password: randomuser.login.password,
                UserId: user.id
              });
            });
          }
        }
      })
      .catch(function(e) {
        throw e;
      });
    }
  } catch (e) {
    sails.log.error(e);
  }
};
