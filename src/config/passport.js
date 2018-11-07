var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// sign up logic
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  req.assert('email', 'invalid email').notEmpty().isEmail();
  req.assert('password', 'invalid password (must be more than 4 characters)').notEmpty().isLength({ min: 4 });
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    console.log(errors);
    errors.forEach(function(error) {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages))
  }
  User.findOne({ 'email': email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, { message: 'This email is already used'})
    }
    var newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(passport);
    newUser.isAdmin = true;
    newUser.save(function(err, result) {
      if (err) {
        return done(err);
      }
      return done(null, newUser);
    })
  })
}));

// sign in logic
passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  req.assert('email', 'invalid email').notEmpty().isEmail();
  req.assert('password', 'invalid password (must be more than 4 characters)').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    console.log(errors);
    errors.forEach(function(error) {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages))
  }
  User.findOne({ 'email': email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'No user found.'})
    }
    // valid password comes from user model
    if(!user.validPassword(password)) {
      return done(null, false, { message: 'Wrong password.'})
    }
    return done(null, user);
  })
}))