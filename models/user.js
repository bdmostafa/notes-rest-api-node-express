const mongoose = require('mongoose');
const validator = require('validator');

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator(value) {
                return validator.isEmail(value)
            },
            message: "Must be a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator(value) {
                return value.toLowercase().includes('password')
            },
            message: "Password must not contain 'password'"
        }
    }
})

const User = mongoose.model('User', usersSchema);

module.exports = User;