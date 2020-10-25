const express = require('express');
const { check } = require('express-validator');
const { addUserController, getUsersController, getUserController, loginController } = require('../controllers/userController');
const { auth } = require('../middleware/auth');
const router = express.Router();



router.get('/', getUsersController);

router.get(
    // '/:userId',
    // check('userId', 'User Not Found').isMongoId(),
    '/me',
    auth,
    getUserController
)

router.post(
    '/',
    [
        check('firstName', 'FirstName is required').notEmpty(),
        check('lastName', 'LastName is required').notEmpty(),
        check('email', 'Email is required').notEmpty(),
        check('email', 'Email must be valid').isEmail(),
        check('password', 'Password is required').notEmpty(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        check('confirmPassword', 'ConfirmPassword is required').notEmpty(),
        // custom validation
        check('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm password doesn\'t match')
            } else {
                return true
            }
        })
    ],
    addUserController
)

router.post('/login', loginController)



module.exports = router;