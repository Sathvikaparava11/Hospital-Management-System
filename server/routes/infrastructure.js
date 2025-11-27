const express = require('express');
const router = express.Router();
const { getDepartments, createDepartment, getRooms, createRoom } = require('../controllers/infrastructureController');

router.get('/departments', getDepartments);
router.post('/departments', createDepartment);
router.get('/rooms', getRooms);
router.post('/rooms', createRoom);

module.exports = router;
