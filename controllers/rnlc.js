const User = require('../models/rnls');
const jwt = require('jsonwebtoken')


// Error Handling
const handleErrors = (err) => {
    const errors = { username: '', email: '', password: '', password2: '' }

    if (err.code === 11000) {
        errors.email = 'Email has been registered already. Kindly Login in!';
        return errors;
    }

    if (err.code === 2400 ) {
        errors.password2 = err.message;
        return errors;
    }

    if (err.message.includes('users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};
const maxAge = 1 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'secret', {
        expiresIn: maxAge
    });
}

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
        return handleErrors(error);
    }

    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);
        res.cookie('register', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } 
    catch (err) {  
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

const login = (req, res) => {
    res.render('login')
};

const login_post = async (req, res) => {
    const { username, password } = req.body;

};

module.exports = {
    register,
    register_post,
    login,
    login_post    
}