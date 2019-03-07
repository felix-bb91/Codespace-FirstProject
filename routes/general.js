// ROUTES

const express = require('express');
const router = express.Router();
const generalController = require('../controllers/general');
const Token = require('../util/Token'); // Cargamos el token

router.get('/whoWeAre/:token',Token.verifyParam, generalController.getWho);

module.exports = router;
