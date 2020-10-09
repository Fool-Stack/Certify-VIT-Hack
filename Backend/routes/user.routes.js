const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const checkAuthUser = require('../middleware/checkAuthUser');
const userControllers = require('../controllers/user.controllers');
const router = express.Router();

router.post('/signup', userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.patch('/verifyEmail', userControllers.verifyEmail);

module.exports = router
