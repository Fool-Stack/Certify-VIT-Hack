const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const eventControllers = require('../controllers/event.controllers')
const router = express.Router();

router.post('/add', checkAuth, eventControllers.addEvent);
// router.get('/:id', eventControllers.getOne);
// router.get('/', eventControllers.getAll);
// router.delete('/delete', eventControllers.eventDelete);
// router.patch('/update', eventControllers.eventUpdate);

module.exports = router