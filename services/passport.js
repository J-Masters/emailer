const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is the unique id from mongo
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // we already have a record with give profile ID
            done(null, existingUser); // first argument = error record, second = user record
          } else {
            // we don't have a record with this ID, create new record
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        })
    }
  )
);
