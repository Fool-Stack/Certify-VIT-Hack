const express = require('express');
const multer = require('multer')
const checkAuth = require('../middleware/checkAuth');
const eventControllers = require('../controllers/event.controllers')
const router = express.Router();
const upload = multer({ dest: './data' });

router.post('/add', checkAuth, eventControllers.addEvent);
router.get('/:id',  eventControllers.getEventByID);
router.delete('/delete', checkAuth, eventControllers.deleteEvent);
router.patch('/update', checkAuth, eventControllers.updateEvent);
router.post('/certificates', upload.single('file'), eventControllers.getCertificates)

module.exports = router