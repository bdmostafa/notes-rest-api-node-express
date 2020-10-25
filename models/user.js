const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
                return !value.toLowerCase().includes('password')
            },
            message: "Password must not contain 'password'"
        }
    }
})

// Hashing data before saving into database
usersSchema.pre('save', async function(next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    // When password is hashed already, no need to be hashed
    if(this.isModified('password')) this.password = hashedPassword;
    next();
})

const User = mongoose.model('User', usersSchema);

module.exports = User;