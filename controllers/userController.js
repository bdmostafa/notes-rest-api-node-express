const { validationResult } = require("express-validator");

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
        const foundUser = await User.findOne({email: req.body.email})
        if(foundUser) return res.status(400).send('User email already registered')

        // When new email is requested, save to database
        await user.save();
        res.send(user);

    } catch (err) {
        res.status(500).send(err)
    }

}



module.exports.getUsersController = (req, res) => {
    res.send('All Users')
}