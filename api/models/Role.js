module.exports = {
  attributes: {
    authority: Sequelize.STRING
  },

  associations: () => {
    User.belongsToMany(Role, {

      through: 'UserRole',
      foreignKey: {
        name: 'RoleId',
        as: 'Users'
      }
    });
  },
  options: {
  }

};
