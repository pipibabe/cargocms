import moment from 'moment';
module.exports = {
  attributes: {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      validate:  {
        isEmail: {
          msg: "請確認 Email"
        }
      },
      unique: true
    },
    firstName: {
      type: Sequelize.STRING,
      validate:  {
        notEmpty: {
          msg: "請確認姓名"
        }
      },
    },
    lastName: {
      type: Sequelize.STRING,
      validate:  {
        notEmpty: {
          msg: "請確認姓名"
        }
      },
    },
    birthday:{
      type: Sequelize.DATE,
      get: function () {
        try {
          if(this.getDataValue('birthday'))
            return moment(this.getDataValue('birthday')).format("YYYY-MM-DD");
          else{
            return "";
          }
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    phone1:{
      type: Sequelize.STRING
    },
    phone2:{
      type: Sequelize.STRING
    },
    address:{
      type: Sequelize.STRING
    },
    address2:{
      type: Sequelize.STRING
    },
    locale: {
      type: Sequelize.STRING,
      defaultValues: 'zh_TW'
    },
    displayName: {
      type: Sequelize.VIRTUAL,
      get: function() {
        const locale = this.getDataValue('locale');
        const firstName = this.getDataValue('firstName');
        const lastName = this.getDataValue('lastName');

        let displayName = firstName + ' ' + lastName;
        const isTw = locale === 'zh_TW';

        var regExp = /^[\d|a-zA-Z]+$/;
        var checkEng = regExp.test(displayName);

        if (isTw || !checkEng) displayName = lastName + firstName;

        if (displayName === '') {
          if (this.getDataValue('username') === ''){
            displayName = this.getDataValue('email');
          } else {
            displayName = this.getDataValue('username');
          }
        }

        return displayName;
      }
    },
    RolesArray: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const thisRoles = this.getDataValue('Roles');
          const roles = thisRoles ? thisRoles.map((role) => role.authority) : [];
          return roles;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    userAgent: {
      type: Sequelize.STRING,
    },
    lastLogin: {
      type: Sequelize.DATE,
      get: function () {
        try {
          let lastLogin = this.getDataValue("lastLogin");

          if (lastLogin == null) {
            return "N/A";
          }

          return moment(this.getDataValue('lastLogin')).format("YYYY/MM/DD HH:mm:SS");

        } catch (e) {
          throw e;
        }
      }
    },
    facebookId: {
      type: Sequelize.STRING,
    },
    avatar: {
      type: Sequelize.STRING,
      defaultValue: '/assets/admin/img/avatars/default.png'
    },
    avatarThumb: {
      type: Sequelize.STRING,
      defaultValue: '/assets/admin/img/avatars/default.png'
    },
    score: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    updatedAt: {
      type: Sequelize.DATE,
      get: function() {
        try {
          return moment(this.getDataValue('updatedAt')).format("YYYY/MM/DD HH:mm:SS");
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    createdAt: {
      type: Sequelize.DATE,
      get: function() {
        try {
          return moment(this.getDataValue('createdAt')).format("YYYY/MM/DD HH:mm:SS");
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
  },
  associations: function() {
    User.hasMany(Image, {
      foreignKey: {
        name: 'UserId'
      }
    });
    User.hasMany(Post, {
      foreignKey: {
        name: 'UserId'
      }
    });
    User.hasMany(Passport, {
      foreignKey: {
        name: 'UserId'
      }
    });

    User.belongsToMany(Role, {
      through: 'UserRole',
      foreignKey: {
        name: 'UserId',
        as: 'Roles'
      }
    });
    User.hasMany(UserLikeRecipe);
    User.hasMany(Recipe);


  },
  options: {
    // tableName: 'Users',
    classMethods: {
      findOneWithPassport: async function({id}) {
        sails.log.info("findOneWithPassport id=>", id);
        return await User.findOne({
          where: {
            id
          },
          include: [ Role, {
              model: Passport,
              where: { provider: 'local' },
              required: false
          }],
        });
      },
      deleteById: async (id) => {
        try {
          return await User.destroy({ where: { id } });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
    },
    instanceMethods: {
      loginSuccess: async function({ userAgent }) {
        const now = new Date();
        this.userAgent = userAgent;
        this.lastLogin = now.getTime();
        await this.save();
      }
    },
    hooks: {
      afterCreate: async function(user, options) {
        const userRole = await Role.findOne({where: {authority: 'user'}});
        await user.addRole(userRole);
      }
    }
  }
};
