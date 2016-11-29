import crypto from 'crypto';
var validator = require('validator');
import axios from 'axios';

exports.register = async (req, res, next) => {

  const secret = sails.config.reCAPTCHA.secret;
  const response = req.body['g-recaptcha-response'];
  const recaptcha = await axios.get(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`);
  if (!recaptcha.data.success) throw Error('請稍候再試');

  var email, password, username;
  email = req.param('email');
  username = req.param('username');
  password = req.param('password');

  let lastName  = req.param('lastName');
  let firstName = req.param('firstName');
  let birthday  = req.param('birthday');
  let phone1    = req.param('phone1');
  let phone2    = req.param('phone2');
  let address   = req.param('address');
  let address2  = req.param('address2');
  const verificationEmailToken = crypto.randomBytes(32).toString('hex').substr(0, 32);

  try {

    if (!email) {
      throw new Error('No email was entered.');
    }

    if (!password) {
      throw new Error('No password was entered.');
    }

    let newUserParams = req.body;

    let newUser = {
      username: newUserParams.username || email,
      email: email,
      lastName,
      firstName,
      phone1,
      phone2,
      address,
      address2,
      verificationEmailToken,
    }

    if (birthday){
      newUser.birthday = birthday;
    }

    let user = await User.create(newUser);

    let passport = await Passport.create({
      provider: 'local',
      protocol: 'local',
      password: password,
      UserId: user.id
    });

    user = await User.findOne({
      where:{
        id: user.id
      },
      include: [Role]
    });
    await UserService.sendVerificationEmail({
      userId: user.id,
      email: user.email,
      displayName: user.displayName,
      signToken: verificationEmailToken,
    });
    return next(null, user);

  } catch (err) {
    console.error(err.stack);
    req.flash('error', err.errors[0].message);
    return next(err);
  }
};



exports.connect = async (req, res, next) => {
  console.info("=== protocol local connect ===");
  var password, user;
  user = req.user;
  password = req.param('password');

  try {
    let passport = await Passport.find({
      protocol: 'local',
      UserId: user.id
    });
    if (!passport) {
      await Passport.create({
        protocol: 'local',
        password: password,
        UserId: user.id
      });
    }
    ext(null, user);

  } catch (e) {
    return next(e);
  }
};


exports.login = async (req, identifier, password, next) => {
  console.info("=== protocol local login ===");
  try {
    var isEmail, query;
    isEmail = validator.isEmail(identifier);
    query = {
      where: {},
      include: [Role]
    };

    if (isEmail) {
      query.where.email = identifier;
    } else {
      query.where.username = identifier;
    }
    let user = await User.findOne(query);
    console.log("== user ==", user.toJSON());
    if (!user) {
      if (isEmail) {
        throw new Error('Error.Passport.Email.NotFound');
      } else {
        throw new Error('Error.Passport.Username.NotFound');
      }
    }

    let passport = await Passport.findOne({
      where: {
        UserId: user.id
      }
    })

    if (passport) {
      let result = await passport.validatePassword(password);
      if (result) {
        const userAgent = req.headers['user-agent'];
        await user.loginSuccess({ userAgent });
        return next(null, user);
      } else {
        throw new Error('Error.Passport.Password.CheckFail');
      }

    } else {
      throw new Error('Error.Passport.Password.NotSet');
    }

  } catch (e) {
    sails.log.error(e.stack);
    req.flash('error','Error.Passport.BadUserPassword');
    next(e);
  }
};
