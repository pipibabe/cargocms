import bcrypt from "bcrypt"

module.exports = {
  attributes: {
    protocol: Sequelize.STRING,
    password: Sequelize.STRING,
    accessToken: Sequelize.STRING,
    provider: Sequelize.STRING,
    identifier: Sequelize.STRING,
    tokens: {
      type: Sequelize.TEXT,
      get: function() {
        var value;
        if (value = this.getDataValue('tokens')) {
          return JSON.parse(value);
        } else {
          return [];
        }
      },
      set: function(value) {
        sails.log.info('value', value);
        return this.setDataValue('tokens', JSON.stringify(value));
      }
    }
  },
  associations: function() {
    Passport.belongsTo(User);
  },
  options: {
    // tableName: 'Passports',
    classMethods: {
      hashPassword: async (passport) => {

        await new Promise((defer, reject) => {
          if (passport.password) {
            bcrypt.hash(passport.password, 10, function (err, hash) {
              passport.password = hash
              defer();
            });
          } else {
            defer();
          }
        });

      },
      createDefaultLocalProviderIfNotExist: async function (user) {
        try {

          let localPassport = await Passport.findOne({
            where: {
              provider: 'local',
              UserId: user.id
            }
          });
          console.log('localPassport ==', localPassport);
          if(localPassport == null){
            let newLocalPassport = {
              provider: "local",
              password: "password",
              UserId: user.id
            }
            console.log("=== newLocalPassport ===", newLocalPassport);
            await Passport.create(newLocalPassport);
          }

        } catch (e) {
          throw e;
        }
      }
    },
    instanceMethods: {
      validatePassword: async (password, passport) => {
        try {
          return await new Promise((defer, reject) => {
            bcrypt.compare(password, passport.password, (err, result) => {
              if (err) defer(false);
              else defer(result);
            });
          });
        } catch (e) {
          throw e;
        }
      }
    },
    hooks: {
      beforeCreate: async (passport) => {
        await Passport.hashPassword(passport);
      },
      beforeUpdate: async (passport) => {
        await Passport.hashPassword(passport);
      }
    }
  }
}
