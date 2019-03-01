// ROUTES

const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/startSession');

router.get('/', sessionController.getLogin);
//router.post('/myProfile', sessionController.postLogin); 
// /myProfile es lo que está dentro del attr action del form y method post
router.get('/register', sessionController.getRegister);
router.post('/', sessionController.postRegister);

module.exports = router;

