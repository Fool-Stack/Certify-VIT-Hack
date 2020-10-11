const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const userControllers = require('../controllers/user.controllers');
const router = express.Router();

router.post('/signup', userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.patch('/verifyEmail', userControllers.verifyEmail);
router.post('/resendVerificationEmail', userControllers.resendVerifyMail);
router.get('/events', checkAuth,   userControllers.seeAllEvents);
router.patch('/forgotPassword', userControllers.forgotPassword);
router.patch('/resetPassword', userControllers.resetPassword);
router.patch('/changePassword', checkAuth, userControllers.changePassword)
router.get('/me', checkAuth, userControllers.getMe);

module.exports = router
