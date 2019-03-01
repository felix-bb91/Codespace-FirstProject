// ROUTES



const express = require('express');
const router = express.Router();
const generalController = require('../controllers/general');

router.get('/whoWeAre', generalController.getWho);

module.exports = router;
