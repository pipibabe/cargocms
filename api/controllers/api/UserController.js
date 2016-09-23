module.exports = {
  follow: async (req, res) => {
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);
      if (!loginUser) res.forbidden();
      const data = { follower: loginUser.id, following: id };
      await Follow.findOrCreate({
        where: data,
        defaults: data
      });
      res.ok({ message: `follow ${id} success.`, data: {} });
    } catch (e) {
      res.serverError(e);
    }
  },

  unfollow: async (req, res) => {
    try {
      const { id } = req.params;
      const loginUser = AuthService.getSessionUser(req);
      if (!loginUser) res.forbidden();
      await Follow.destroy({
        where: {
          follower: loginUser.id,
          following: id,
        },
      });
      res.ok({ message: `unfollow ${id} success.`, data: {} });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      sails.log.info('update user controller id=>', id);
      sails.log.info('update user controller data=>', data);
      if (data.email.length === 0) {
        throw Error('Validation error: Email 不可為空');
      }
      const { password, passwordConfirm } = data;
      const checkPwdEqual = password === passwordConfirm;

      if (checkPwdEqual) {
        const user = await UserService.updateByUser({
          id: id,
          ...data,
        });
        const checkLastName = user.lastName === data.lastName;
        const checkFirstName = user.firstName === data.firstName;
        const checkEmail = user.email === data.email;
        if (checkEmail && (checkFirstName && checkLastName)) {
          req.session.passport.user.displayName = user.displayName;
          req.session.passport.user.lastName = user.lastName;
          req.session.passport.user.firstName = user.firstName;
          req.session.passport.user.email = user.email;
          req.session.passport.user.local = user.local;
          req.session.passport.user.avatarThumb = user.avatarThumb;
          req.session.passport.user.avatar = user.avatar;
          res.send(req.session);
          // res.ok({
          //   message: 'Update user success.',
          //   data: user,
          // });
        } else {
          throw Error(`update user ${id} failed`);
        }
      } else {
        throw Error('error: user password and passwordConfirm is not equal!');
      }
    } catch (e) {
      res.serverError(e);
    }
  },

}
