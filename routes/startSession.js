// ROUTES

const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/startSession');

router.get('/', sessionController.getLogin);
router.get('/register', sessionController.getRegister);
router.post('/', sessionController.postRegister);

module.exports = router;

