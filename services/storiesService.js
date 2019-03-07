const Stories = require('../models/story');


async function getAllStories(){

    let allStories;
    try {

        allStories = await Stories.fetchAll();

    } catch (err) {console.log(err);}

    allStories = allStories[0]; // Da un array de dos elementos, el primero es el que tiene la info que queremos, el segundo tiene info de la propia db
    
    return allStories;
}




module.exports = {
    getAllStories,
};
