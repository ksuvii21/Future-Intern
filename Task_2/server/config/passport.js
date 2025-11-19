const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        // We don't get a password from Google
      };

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          done(null, user);
        } else {
          // Check if user exists with this email
          user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            // Link Google ID to existing account
            user.googleId = profile.id;
            await user.save();
            done(null, user);
          } else {
            // Create a new user
            user = await User.create(newUser);
            done(null, user);
          }
        }
      } catch (err) {
        console.error(err);
        done(err, null);
      }
    }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
