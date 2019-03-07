const User = require('../models/users');
const Story = require('../models/story');
const Section = require('../models/section');
const Token = require('../util/Token'); // Cargamos el token

// Save a Section
exports.postSection = (req, res, next) => {
   
    //console.log(req.userId); // Lo saca del token

    const id = req.body.id;
    const story_id = req.params.idStory;
    const author_id =  req.userId;
    const uploaded_date = req.body.uploaded_date;
    const body = req.body.body;

    const section = new Section (null, story_id, author_id, null, body);
    //console.log(section);

    // getAllSectionsByStoryID(StoryId) 

    section.createSection()
    .then(() => {
        return Story.getStoryByID(story_id)
        .then(([row]) => {

            const story = row;
            return Section.getAllSectionsByStoryID(story_id)
            .then(([rowSection]) =>{

                const sections = rowSection;
                //console.log(sections[0]); // Te dará el primero de la lista
                
                res.render('story', { 
                    pageTitle: 'story',
                    story: story,
                    sections: sections,
                    // Da un objeto en el que la primera (y única fila) es la que tiene la info
                    token : Token.buildToken(author_id)
                });
            }) 
    
        })
    })
    .catch(err => console.log(err));


};

