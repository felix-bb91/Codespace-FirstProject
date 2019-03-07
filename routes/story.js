// ROUTES

const express = require('express');
const router = express.Router();
// const storyController = require('../controllers/story');
const storyController = require('../controllers/storyV2');
const sectionController = require('../controllers/sectionController');
const Token = require('../util/Token'); // Cargamos el token


router.post('/addStory/:id/:token', Token.verifyParam, storyController.postStory); 
router.post('/addSection/:idStory/:token', Token.verifyParam, sectionController.postSection); 

router.get('/home/:token', Token.verifyParam, storyController.getAllStoriesAndTags); 
router.get('/story/:idStory/:token', Token.verifyParam, storyController.getAStory); 
router.get('/showAll/:token',Token.verifyParam, storyController.getAllStoriesAndTagsShowAll); 


module.exports = router;

