// CONTROLLER

const User = require('../models/users');
const Story = require('../models/story');
const Tags = require('../models/tags');
const Token = require('../util/Token'); // Cargamos el token
const TagsInArray = require('../util/reagrupTagsOneStory'); 
const Section = require('../models/section');


// Save a Story
exports.postStory = (req, res, next) => {
    const id = req.body.id;
    const author_id = req.params.id; // OJO, es params, id ya que en la route pone id
    const title = req.body.title;
    const uploaded_date = req.body.uploaded_date;
    const body = req.body.body;

    const story = new Story (null, author_id, title, null, body);

    const tags = req.body.tags; // Tags itroducidos por el user al crear la story
    let userRow;   // Objeto con toda la info del user
    let idStory; // id de la última story

    story.createStory()
    .then(() => {
        return User.getUserByID(author_id) }) // Recojo la info del user creador
    .then(([row]) => {
        userRow = row[0];
        return Story.getLastStoryId()}) // Necesitamos el id del relato recien creado
    .then(([row]) => { // Devuelve la fila con el id de la última story
        idStory = row[0].id; // Este es el id del relato recien creado
            if(tags){ // Si hay tags
                    return Tags.fetchAll()}}) // Traigo todos los tags de la DDBB
    // forEach of the tags in our create story form, go through each of our tags in the database and check if the tag in the database equals to the tagname in the body.
    .then(([rowsOfTags]) => { // rowsOfTags: todos los tags de la DDBB
        if(typeof tags === 'object'){ // Si se han introducido más de un tag será un array
            tags.forEach(async (tags) => { // tag es la variable con los tags deseados para la story
                rowsOfTags.forEach(async (rowOfTag) => {
                    if (tags === rowOfTag.tagname) {
                        await Tags.saveTagsWithStory(idStory, rowOfTag.id);
                    }
                })
            })
        }
        else{ // Si solo se ha introducido un tag
            rowsOfTags.forEach(async (rowOfTag) => {
                if (tags === rowOfTag.tagname) {
                    await Tags.saveTagsWithStory(idStory, rowOfTag.id);
                }
            })
        }

    })
    .then(() => {
        
        let token = Token.buildToken(userRow.id);
        
        /* Irá a la ruta especificada en el redirect y hará lo que diga
        el router, en este caso verificar el token y cargar todas las historias */
        res.redirect(`/home/${token}`);
    })  
    .catch(err => console.log(err));
};




// Trae todas las historias en formato objeto con todos sus tags en un array
exports.getAllStoriesAndTags = (req, res, next) => {

    token = req.params.token;

    Story.getAllStoriesAndTags()
    .then(([rows]) => {

        uniqueIdStories = TagsInArray.createUniqueStoriesWithAllTags(rows);

        res.render('home', { 
            pageTitle: 'home',
            stories: uniqueIdStories, /* Array de objetos que puedo usar en la plantilla que tiene la info de TODOS los relatos Si un Relato tiene más de un tag ya NO aparecerá como dos objetos diferentes. */
            token: token
        });
    })
    
    .catch(err => console.log(err));


};




// Get one Story
exports.getAStory = (req, res, next) => {

    const idStory = req.params.idStory; // Lo sacará de la URL - mira el js/story.js
    idUser = req.userId;

    Story.getStoryByID(idStory)
    .then(([row]) => {

        const story = row;
        return Section.getAllSectionsByStoryID(idStory)
        .then(([rowSection]) =>{

            const sections = rowSection;
            //console.log(sections[0]); // Te dará el primero de la lista
            
            res.render('story', { 
                pageTitle: 'story',
                story: story,
                sections: sections,
                // Da un objeto en el que la primera (y única fila) es la que tiene la info
                token : Token.buildToken(idUser)
            });
        }) 

    })




      
};








// Trae todas las historias en formato objeto con todos sus tags en un array
exports.getAllStoriesAndTagsShowAll = (req, res, next) => {

    Story.getAllStoriesAndTags()
    .then(([rows]) => {

        uniqueIdStories = TagsInArray.createUniqueStoriesWithAllTags(rows);

        const idUser = req.userId; 

        res.render('showAll', { 
            pageTitle: 'showAll',
            stories: uniqueIdStories, /* Array de objetos que puedo usar en la plantilla que tiene la info de TODOS los relatos Si un Relato tiene más de un tag ya NO aparecerá como dos objetos diferentes. */
            token : Token.buildToken(idUser),
        });
    })
    
    .catch(err => console.log(err));


};      