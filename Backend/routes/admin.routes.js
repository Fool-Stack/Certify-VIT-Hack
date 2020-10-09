const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const checkAuthAdmin = require('../middleware/checkAuthAdmin');
const adminControllers = require('../controllers/admin.controllers')
const router = express.Router();

router.post('/signup', adminControllers.adminRegister);
router.post('/login', adminControllers.adminLogin);
router.patch('/verifyEmail', adminControllers.verifyEmail);

module.exports = router
