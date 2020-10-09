const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const eventControllers = require('../controllers/event.controllers')
const router = express.Router();

router.post('/add', checkAuth, eventControllers.addEvent);
router.get('/get', checkAuth, eventControllers.getEventByID);
router.delete('/delete', checkAuth, eventControllers.deleteEvent);
router.patch('/update', checkAuth, eventControllers.updateEvent);

module.exports = router