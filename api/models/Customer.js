import moment from 'moment';
module.exports = {
  attributes: {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    birthday:{
      type: Sequelize.DATE,
      get: function() {
        try {
          let birthday = this.getDataValue('birthday');

          if (!birthday) {
            return null;
          }

          return moment(new Date(birthday)).format("YYYY/MM/DD");

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

        var regExp = /^[\d|a-zA-Z| ]+$/;
        var checkEng = regExp.test(displayName);

        if (!checkEng) {
          displayName = lastName + firstName;
        } else if(isTw){
          displayName = lastName + firstName;
        }

        if (displayName === '') {
          if (this.getDataValue('name') === ''){
            displayName = this.getDataValue('email');
          } else {
            displayName = this.getDataValue('name');
          }
        }

        return displayName;
      }
    },
    userAgent: {
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
    createdDateTime:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('createdAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    },

    updatedDateTime:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('updatedAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    },
  },
  associations: function() {
  },
  options: {
    // tableName: 'Users',
    classMethods: {
      deleteById: async (id) => {
        try {
          return await Customer.destroy({ where: { id } });
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
    }
  }
};
