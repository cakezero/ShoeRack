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

module.exports = { 
    requireAuth,
    checkUser
};
