const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a Username'],
        unique: true,
        lowercase: true,
        minlength: [4, 'Username should be atleast 4 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Minimum password length should be 8 characters']
    }
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSaltSync(14);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('users', userSchema);

module.exports = User;


// 永久, 恵比