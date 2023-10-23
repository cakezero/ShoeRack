const User = require('../models/rnls');
const jwt = require('jsonwebtoken')
const passport = require('passport')


// Error Handling
const handleErrors = (err) => {
    const errors = { username: '', email: '', password: '' }

    if (err.code === 11000) {
        errors.email = 'Email has been registered already. Kindly Login in!';
        return errors;
    }

    if (err.message === 'Incorrect email') {
        errors.email = 'This email does not exist';
    }

    if (err.message === 'Incorrect password') {
        errors.password = 'Incorrect password';
    }

    if (err.code === 2400 ){
        errors.password = err.message;
        return errors;
    }

    if (err.message.includes('users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};


//  MaxAge
const maxAge = 1 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'secret_message', {
        expiresIn: maxAge
    });
}


// Register
const register = (req, res) => {
    res.render('register')
};

const register_post = async (req, res) => {
    const { username, email, password, password2 } = req.body;

    if (password !== password2) {
        error = {
            message: 'Passwords do not match',
            code: 2400
        }
        errors = handleErrors(error);
       return res.status(400).json({ errors });
    }

    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);
        res.cookie('shoe_cookie', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } 
    catch (err) {  
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};


// Login
const login = (req, res) => {
    res.render('login')
};

// const login_post = async (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) {
//             return res.status(400).json({ errors: err })
//         }
//         if (!user) {
//             return res.status(400).json({ errors: info })
//         }
//         req.login(user, async (err) => {
//             if (err) {
//                 return res.status(400).json({ errors: err })
//             }
//         })
//         const token = createToken(user._id);
//         res.cookie('shoe_cookie', token, { httpOnly: true, maxAge: maxAge * 1000 });
//         res.status(200).json({ user: user._id, token: token });
//     });
//     (req, res, next);
// }

const login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await User.login(email, password);
        const token = createToken(users._id);
        res.cookie('shoe_cookie', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: users._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
};


// Logout
const logout = (req, res) => {
    res.cookie('shoe_cookie', '', { maxAge: 1 });
    res.redirect('/');
}

module.exports = {
    register,
    register_post,
    login,
    login_post,
    logout
}