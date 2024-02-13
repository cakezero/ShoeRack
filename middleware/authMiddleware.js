require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/rnls');

const requireAuth = (req, res, next) => {
    const token = req.cookies.shoe_cookie;
    if (token) {
        jwt.verify(token, process.env.SECRET_MESSAGE, (err, decodedToken) => {
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
        jwt.verify(token, process.env.SECRET_MESSAGE, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                console.log(err)
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
};

<<<<<<< HEAD

=======
>>>>>>> a001d1652b1fb0326e6369d0eaa573893491a977

module.exports = { 
    requireAuth,
    checkUser
<<<<<<< HEAD
};
=======
};
>>>>>>> a001d1652b1fb0326e6369d0eaa573893491a977
