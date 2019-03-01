// ROUTES

const express = require('express');
const router = express.Router();
// const storyController = require('../controllers/story');
const storyController = require('../controllers/storyV2');

router.post('/addStory/:id', storyController.postStory); 
router.get('/home', storyController.getAllStoriesAndTags); 
router.get('/story/:idStory', storyController.getAStory); 
router.get('/showAll', storyController.getAllStoriesAndTagsShowAll); 
module.exports = router;

