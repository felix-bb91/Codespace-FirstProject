// ROUTES
const Token = require('../util/Token'); // Cargamos el token
const express = require('express');
const router = express.Router();
const myProfileController = require('../controllers/myProfile');



const sessionController = require('../controllers/startSession');

router.post('/', sessionController.postLogin); 
// /myProfile es lo que está dentro del attr action del form y method post

router.get('/:token', Token.verifyParam, myProfileController.getProfile);
//router.get('/myProfile/:id', myProfileController.getProfile);

router.post('/remove/:token', Token.verifyParam, myProfileController.postRemoveUser);
//router.post('/remove/:id', myProfileController.postRemoveUser);

router.post('/editProfile/:token', Token.verifyParam, myProfileController.saveImg);
//router.post('/editProfile/:id', myProfileController.saveImg);


module.exports = router;




