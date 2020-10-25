const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

// Models
const User = require("../models/user");



module.exports.addUserController = async (req, res) => {
    // Checking the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send(errors.array());

    // Collect the user
    const user = new User(req.body);
    try {
        // Checking if email already exists or not
        const foundUser = await User.findOne({ email: req.body.email })
        if (foundUser) return res.status(400).send('User email already registered')

        // When new email is requested, save to database
        await user.save();
        res.send(user);

    } catch (err) {
        res.status(500).send(err)
    }

}

module.exports.getUserController = async (req, res) => {

    const id = req.params.userId;

    try {
        console.log(id)
        // Password is not allowed to pass to client section (-password)
        const user = await User.findById(id, '-password');
        if (!user) return res.status(404).send('User Not Exists')
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports.getUsersController = async (req, res) => {
    try {
        // Password is not allowed to pass to client section
        const users = await User.find({}, '-password');
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }

}

module.exports.loginController = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Check User Email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Unable to login');

        // Check User password
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) return res.status(400).send('Unable to login');

        // Successfully LoggedIn
        res.send('LoggedIn Successfully!')
        
    } catch (err) {
        res.status(500).send(err)
    }
}