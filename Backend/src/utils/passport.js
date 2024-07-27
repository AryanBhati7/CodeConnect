// import session from 'express-session';
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport';

// const passportUtil = (app) => {
//   app.use(passport.initialize());

//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: '/auth/google/callback',
//         scope: ['profile', 'email'],
//       },
//       (accessToken, refreshToken, profile, callback) => {
//         console.log(profile);
//         return callback(null, profile);
//       }
//     )
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });
//   passport.deserializeUser((user, done) => {
//     done(null, user);
//   });
// };

// export default passportUtil;
