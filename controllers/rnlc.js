const User = require('../models/rnls');


// Error Handling
const handleErrors = (err) => {
    const errors = { username: '', email: '', password: '' }

    if (err.code === 11000) {
        errors.email = 'Email has been registered already. Kindly Login in!';
        return errors;
    }

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).ForEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

const register = (req, res) => {
    res.render('register')
};

const register_post = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        res.status(200).json(user);
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