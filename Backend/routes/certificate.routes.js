const express = require('express');
const multer = require('multer')
const checkAuth = require('../middleware/checkAuth');
const certificateControllers = require('../controllers/certificate.controller')
const router = express.Router();
const upload = multer({ dest: './data' });

router.post('/verify', certificateControllers.viewCertificateDetailsFromQrCode);

module.exports = router