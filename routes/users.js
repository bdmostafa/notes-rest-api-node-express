const express = require('express');
const { addUserController, getUsersController } = require('../controllers/userController');
const router = express.Router();



router.get('/', getUsersController);

router.post('/', addUserController)




module.exports = router;