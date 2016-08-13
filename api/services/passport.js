var passport, path, url;

path = require('path');

url = require('url');

passport = require('passport');


/**
 * Passport Service
#
 * A painless Passport.js service for your Sails app that is guaranteed to
 * Rock Your Socks™. It takes all the hassle out of setting up Passport.js by
 * encapsulating all the boring stuff in two functions:
#
 *   passport.endpoint()
 *   passport.callback()
#
 * The former sets up an endpoint (/auth/:provider) for redirecting a user to a
 * third-party provider for authentication, while the latter sets up a callback
 * endpoint (/auth/:provider/callback) for receiving the response from the
 * third-party provider. All you have to do is define in the configuration which
 * third-party providers you'd like to support. It's that easy!
#
 * Behind the scenes, the service stores all the data it needs within "Pass-
 * ports". These contain all the information required to associate a local user
 * with a profile from a third-party provider. This even holds true for the good
 * ol' password authentication scheme – the Authentication Service takes care of
 * encrypting passwords and storing them in Passports, allowing you to keep your
 * User model free of bloat.
 */

passport.protocols = require('./protocols');


/**
 * Connect a third-party profile to a local user
#
 * This is where most of the magic happens when a user is authenticating with a
 * third-party provider. What it does, is the following:
#
 *   1. Given a provider and an identifier, find a matching Passport.
 *   2. From here, the logic branches into two paths.
#
 *     - A user is not currently logged in:
 *       1. If a Passport wasn't found, create a new user as well as a new
 *          Passport that will be assigned to the user.
 *       2. If a Passport was found, get the user associated with the passport.
#
 *     - A user is currently logged in:
 *       1. If a Passport wasn't found, create a new Passport and associate it
 *          with the already logged in user (ie. "Connect")
 *       2. If a Passport was found, nothing needs to happen.
#
 * As you can see, this function handles both "authentication" and "authori-
 * zation" at the same time. This is due to the fact that we pass in
 * `passReqToCallback: true` when loading the strategies, allowing us to look
 * for an existing session in the request and taking action based on that.
#
 * For more information on auth(entication|rization) in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 * http://passportjs.org/guide/authorize/
#
 * @param {Object}   req
 * @param {Object}   query
 * @param {Object}   profile
 * @param {Function} next
 */

passport.connect = async function(req, query, profile, next) {

  try {
    console.info('=== profile ===', profile);
    console.info('=== query ===', query);
    var provider, user;
    user = {};
    provider = undefined;
    query.provider = req.param('provider');
    provider = profile.provider || query.provider;
    if (!provider) {
      return next(new Error('No authentication provider was identified.'));
    }

    if (profile.hasOwnProperty('emails')) {
      user.email = profile.emails[0].value || profile.emails[0];
    } else if (profile.hasOwnProperty('email')) {
      user.email = profile.email;
    }

    let locale = profile._json.locale;
    let token = query.tokens.accessToken;
    let identifier = query.identifier;
    let profileWithLocale = await FacebookService.getProfileWithLocale({token, identifier, locale});

    let profileWithLocaleHasName = profileWithLocale.hasOwnProperty('first_name') && profileWithLocale.first_name != undefined

    user.locale = locale;
    if(profileWithLocaleHasName){
      user.firstName = profileWithLocale.first_name;
      user.lastName = profileWithLocale.last_name;
    } else {
      user.firstName = profile.name.givenName;
      user.lastName = profile.name.familyName;
    }

    if (profile.hasOwnProperty('username') && profile.username != undefined) {
      user.username = profile.username
    } else if (user.email != undefined) {
      user.username = user.email;
    } else {
      user.username = user.lastName + user.firstName;
    }

    // 儲存 Facebook ID 和個人頭像照片
    user.facebookId = profile.id;
    user.avatar = "https://graph.facebook.com/" + profile.id + "/picture?redirect=true&height=470&width=470";

    if (profile.hasOwnProperty('photos') && profile.photos.length > 0) {
      user.avatarThumb = profile.photos[0].value;
    }

    console.log("new user", user);



    if (!user.username && !user.email) {
      throw new Error('Neither a username nor email was available');
    }


    let dbPassport = await Passport.findOne({
      where: {
        provider: provider,
        identifier: query.identifier.toString()
      }
    });


    let loginedUser = req.user;
    let Logined_WithoutDbPassport = !!loginedUser && !dbPassport;

    if (Logined_WithoutDbPassport) {
      //有一般使用者登入但沒使用FB註冊過
      console.info("=== Logined_WithoutdbPassport ===");
      query.UserId = loginedUser.id;
      await Passport.create(query);
      return next(null, loginedUser);
    }else if(dbPassport){
      //已用FB註冊過，直接登入
      console.info("=== dbPassport ===");
      if(query.hasOwnProperty('tokens') && query.tokens !== passport.tokens){
        dbPassport.tokens = query.tokens;
        dbPassport = await dbPassport.save();
      }
      console.info("=== dbPassport passport ===", passport);
      user = await User.findOne({
        where:{
          id: dbPassport.UserId
        },
        include: [Role]
      });
      if(user)
         return next(null, user)
      else
        throw new Error('Error user not found');
    }else {
      // 全新使用者沒有 user 也沒有 password

      let checkMail;
      if(user.hasOwnProperty('eamil')){
        checkMail = await User.findOne({where:{email:user.email}});
      }

      if(checkMail){
        throw new Error('Error passport email exists');
      }

      let newUser = await User.create(user);
      query.UserId = newUser.id;

      await Passport.createDefaultLocalProviderIfNotExist(newUser);

      newUser = await User.findOne({
        where:{
          id: newUser.id
        },
        include: [Role]
      });

      let newFacebookPassword = await Passport.create(query);
      return next(null, newUser);

    }

  } catch (err) {
    req.flash('error',err.message);
    console.error(err.stack);
    return next(err);
  }

};


/**
 * Create an authentication endpoint
#
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
#
 * @param  {Object} req
 * @param  {Object} res
 */

passport.endpoint = function(req, res) {
  var options, provider, strategies;
  strategies = sails.config.passport;
  provider = req.param('provider');
  options = {};
  if (!strategies.hasOwnProperty(provider)) {
    return res.redirect('/login');
  }
  if (strategies[provider].hasOwnProperty('scope')) {
    options.scope = strategies[provider].scope;
  }
  this.authenticate(provider, options)(req, res, req.next);
};


/**
 * Create an authentication callback endpoint
#
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
#
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

passport.callback = async function(req, res, next) {
  sails.log.info('=== start login ===');
  var action, provider;
  provider = req.param('provider', 'local');
  action = req.param('action');

  try {
    sails.log.info('=== provider ===', provider);
    sails.log.info('=== action ===', action);
    if (provider === 'local' && action !== void 0) {
      if (action === 'register' && !req.user) {
        await this.protocols.local.register(req, res, next);
      } else if (action === 'connect' && req.user) {
        this.protocols.local.connect(req, res, next);
      } else if (action === 'disconnect' && req.user) {
        this.protocols.local.disconnect(req, res, next);
      } else {
        throw new Error('Invalid action');
      }
    } else {

      if (action === 'disconnect' && req.user) {
        this.disconnect(req, res, next);
      } else {
        sails.log.info('=== start authenticate ===');
        this.authenticate(provider, next)(req, res, req.next);
      }
    }

  } catch (e) {
    sails.log.error(e.stack);
    next(e);
  }
};


/**
 * Load all strategies defined in the Passport configuration
#
 * For example, we could add this to our config to use the GitHub strategy
 * with permission to access a users email address (even if it's marked as
 * private) as well as permission to add and update a user's Gists:
#
    github: {
      name: 'GitHub',
      protocol: 'oauth2',
      strategy: require('passport-github').Strategy
      scope: [ 'user', 'gist' ]
      options: {
        clientID: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET'
      }
    }
#
 * For more information on the providers supported by Passport.js, check out:
 * http://passportjs.org/guide/providers/
#
 */

passport.loadStrategies = function() {
  var self, strategies;
  self = this;
  strategies = sails.config.passport;
  Object.keys(strategies).forEach(function(key) {
    var Strategy, baseUrl, callback, options, protocol;
    options = {
      passReqToCallback: true
    };
    Strategy = void 0;
    if (key === 'local') {
      _.extend(options, {
        usernameField: 'identifier'
      });
      _.extend(options, strategies[key].options || {});
      if (strategies.local) {
        Strategy = strategies[key].strategy;
        self.use(new Strategy(options, self.protocols.local.login));
      }
    } else if (key === 'bearer') {
      if (strategies.bearer) {
        Strategy = strategies[key].strategy;
        self.use(new Strategy(self.protocols.bearer.authorize));
      }
    } else {
      protocol = strategies[key].protocol;
      callback = strategies[key].callback;
      if (!callback) {
        callback = 'auth/' + key + '/callback';
      }
      Strategy = strategies[key].strategy;
      baseUrl = sails.getBaseurl();
      switch (protocol) {
        case 'oauth':
        case 'oauth2':
          options.callbackURL = url.resolve(baseUrl, callback);
          break;
        case 'openid':
          options.returnURL = url.resolve(baseUrl, callback);
          options.realm = baseUrl;
          options.profile = true;
      }
      _.extend(options, strategies[key].options);
      self.use(new Strategy(options, self.protocols[protocol]));
    }
  });
};


/**
 * Disconnect a passport from a user
#
 * @param  {Object} req
 * @param  {Object} res
 */

passport.disconnect = function(req, res, next) {
  var provider, user;
  user = req.user;
  provider = req.param('provider');
  return Passport.findOne({
    where: {
      provider: provider,
      user: user.id
    }
  }).then(function(passport) {
    return Passport.destroy(passport.id).then(function() {
      return next(null, user);
    });
  });
};

passport.serializeUser(function(user, next) {
  return next(null, user);
});

passport.deserializeUser(function(user, next) {

  return next(null, user);
});

module.exports = passport;
