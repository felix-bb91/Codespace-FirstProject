// CONTROLLER MAL ya que hay un bucle for que es síncrono dentro de procesos asíncronos
// lo que hace que el for acabe antes de que se realicen las promesas

const User = require('../models/users');
const Story = require('../models/story');
const Tags = require('../models/tags');


// Save a Story
exports.postStory = (req, res, next) => {
    const id = req.body.id;
    const author_id = req.params.id; // OJO, es params, id ya que en la route pone id
    const title = req.body.title;
    const uploaded_date = req.body.uploaded_date;
    const body = req.body.body;

    const story = new Story (null, author_id, title, null, body);
    //console.log(story);

    let tags = req.body.tags; // Array con los valores
    //console.log(tags);


    story.createStory()
    .then(() => {
        User.getUserByID(author_id) // Recojo la info del user creador
        .then(([row]) => {
            // Esta parte es para guardar los tags
            Story.getLastStoryId() // Necesitamos el id del relato recien creado
            .then(([row]) => {
                let idStory = row[0].id; // Este es el id del relato recien creado
                //console.log(idStory);
                if(tags){ // Si hay tags, guardalos en DDBB
                    Tags.fetchAll()
                    .then(([row]) => {
                        //console.log(row);
                        //console.log(row[0].tagname); // Array de objetos, selecciono una fila y el campo
                        for(let i = 0; i < tags.length; i++){
                            if(row[i].tagname == tags[i]){
                                Tags.saveTagsWithStory(idStory, row[i].id)
                                .then(() => {console.log("Tag insertado")})
                                .catch(err => console.log(err));
                            }
                        }    
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            
            // Una vez insertados los tags hago el render

            res.render('myProfile', { 
                pageTitle: 'myProfile',
                user: row[0] // Variable que puedo usar en la plantilla que tiene la info del usuario
            });
            
        })
        .catch(err => console.log(err));
        
    })
    .catch(err => console.log(err));





};



