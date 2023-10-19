const jwt = require('jsonwebtoken');
const User = require('../models/rnls');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const requireAuth = (req, res, next) => {

    const token = req.cookies.shoe_cookie;
    if (token) {
        jwt.verify(token, 'secret_message', (err, decodedToken) => {
            if (err) {
                res.redirect('/user/login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/user/login');
    }
};

const checkUser = (req, res, next) => {

    const token = req.cookies.shoe_cookie;
    if (token) {
        jwt.verify(token, 'secret_message', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                console.log(err)
                next();
            } else {
                let user = await User.findById(decodedToken._id);
                res.locals.user = user;
                console.log(user);
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
};

// passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
// }, async (email, password, done) => {
//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return done(null, false, { message: 'Incorrect email.' });
//     }

//     // Compare passwords using bcrypt
//     const passwordMatch = await bcrypt.compareSync(password, user.password);

//     if (!passwordMatch) {
//       return done(null, false, { message: 'Incorrect password.' });
//     }

//     // If login is successful, return the user object
//     return done(null, user);
//   } catch (error) {
//     return done(error);
//   }
// }));

// // Serialization and deserialization logic (if needed)
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

module.exports = { 
    requireAuth,
    checkUser,
    // passport
};