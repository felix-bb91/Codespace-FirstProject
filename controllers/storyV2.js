// CONTROLLER

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
        res.render('myProfile', { 
            pageTitle: 'myProfile',
            user: userRow // Variable que puedo usar en la plantilla que tiene la info del usuario
        });
    })  
    .catch(err => console.log(err));
};




// Trae todas las historias en formato objeto con todos sus tags en un array
exports.getAllStoriesAndTags = (req, res, next) => {

    Story.getAllStoriesAndTags()
    .then(([rows]) => {

        // console.log(row);

        const stories = rows;

        /* Si un relato tiene varios tags, aparecerán tantos objetos de ese relato como tags tenga, todos iguales salvo el tagname. Para ellos necesitamos reconvertir esa informacion de forma que por cada relato únicamente haya un objeto el cual tenga el atributo tagname en formato array con todos los tags que le correspondan. */

        // El objeto Set te permite almacenar valores ÚNICOS de cualquier tipo
        // [...X] ya que no sabemos qué cantidad de elementos va a tener el array
        // Map realiza una operacion en cada uno de los valores y lo devuelve
        const distinctIds = [... new Set(stories.map( x => x.id))];
        // El map nos devovlería un array con todos los ids.
        // Set nos creará el array de ids cogiendo únicamente aquellos que sean distintos
        // Resultado: Crea un array indeterminado de valores DIFERENTES donde, por cada componente, guardará el id
        //console.log("distinctIds: ");
        //console.log(distinctIds); // Resultado [80, 75] --> Tenemos todos los ids que existen SIN repetirlos

        const uniqueIdStories = []; 
        // Array de objetos donde guardaremos los objetos Story sin repetir y que contendrá TODOS los tagas de cada uno

        // El método forEach() ejecuta la función indicada una vez por cada elemento del array.
        distinctIds.forEach(id => { // Cada elemento es un id, por eso lo llama id aquí, no es más que un nombre
            // hará este bucle n veces, donde n es el número de ids diferentes  
            uniqueIdStories // vamos a rellenarlo
            .push(stories.filter((element) => { // Filter devuelve los valores de stories que cumplen la condicion
                return element.id === id;
            }) // Ha copiado todos los objetos de stories que tuviesen el id de la iteración en la que estamos dentro de uniqueIdStories

            // Ahora vamos a reducir los que estén repetidos a uno solo pero añadiendo los tags nuevos que aparezcan
            .reduce((uniqueIdStoriesArray, storyElement)=> {
                // Reduce aplica una funcion acumulada que acaba devolviendo un solo valor
                // array.reduce(function(total, currentValue), initialValue)
                // total --> es en un principio el valor inicial (el primero)
                // initialValue --> Optional. A value to be passed to the function as the initial value
                uniqueIdStoriesArray.id = storyElement.id;
                uniqueIdStoriesArray.title = storyElement.title;
                uniqueIdStoriesArray.author_id = storyElement.author_id;
                uniqueIdStoriesArray.body = storyElement.body;
                uniqueIdStoriesArray.tagname.push(storyElement.tagname);
                return uniqueIdStoriesArray;
            }, {tagname: []}));
        });
        // console.log("Resultado final: ");
        // console.log(uniqueIdStories);




        res.render('home', { 
            pageTitle: 'home',
            stories: uniqueIdStories /* Array de objetos que puedo usar en la plantilla que tiene la info de TODOS los relatos Si un Relato tiene más de un tag ya NO aparecerá como dos objetos diferentes. */
            
        });
    })
    
    .catch(err => console.log(err));


};









// Get one Story
exports.getAStory = (req, res, next) => {

    const idStory = req.params.idStory; // Lo sacará de la URL - mira el js/story.js
    console.log(idStory);
    Story.getStoryByID(idStory)
    .then(([row]) => {

        const story = row;
        //console.log(story);

        res.render('story', { 
            pageTitle: 'story',
            story: story 
            // Da un objeto en el que la primera (y única fila) es la que tiene la info
            
        });

    })
    .catch(err => console.log(err));


};











// Trae todas las historias en formato objeto con todos sus tags en un array
exports.getAllStoriesAndTagsShowAll = (req, res, next) => {

    Story.getAllStoriesAndTags()
    .then(([rows]) => {

        // console.log(row);

        const stories = rows;

        /* Si un relato tiene varios tags, aparecerán tantos objetos de ese relato como tags tenga, todos iguales salvo el tagname. Para ellos necesitamos reconvertir esa informacion de forma que por cada relato únicamente haya un objeto el cual tenga el atributo tagname en formato array con todos los tags que le correspondan. */

        // El objeto Set te permite almacenar valores ÚNICOS de cualquier tipo
        // [...X] ya que no sabemos qué cantidad de elementos va a tener el array
        // Map realiza una operacion en cada uno de los valores y lo devuelve
        const distinctIds = [... new Set(stories.map( x => x.id))];
        // El map nos devovlería un array con todos los ids.
        // Set nos creará el array de ids cogiendo únicamente aquellos que sean distintos
        // Resultado: Crea un array indeterminado de valores DIFERENTES donde, por cada componente, guardará el id
        //console.log("distinctIds: ");
        //console.log(distinctIds); // Resultado [80, 75] --> Tenemos todos los ids que existen SIN repetirlos

        const uniqueIdStories = []; 
        // Array de objetos donde guardaremos los objetos Story sin repetir y que contendrá TODOS los tagas de cada uno

        // El método forEach() ejecuta la función indicada una vez por cada elemento del array.
        distinctIds.forEach(id => { // Cada elemento es un id, por eso lo llama id aquí, no es más que un nombre
            // hará este bucle n veces, donde n es el número de ids diferentes  
            uniqueIdStories // vamos a rellenarlo
            .push(stories.filter((element) => { // Filter devuelve los valores de stories que cumplen la condicion
                return element.id === id;
            }) // Ha copiado todos los objetos de stories que tuviesen el id de la iteración en la que estamos dentro de uniqueIdStories

            // Ahora vamos a reducir los que estén repetidos a uno solo pero añadiendo los tags nuevos que aparezcan
            .reduce((uniqueIdStoriesArray, storyElement)=> {
                // Reduce aplica una funcion acumulada que acaba devolviendo un solo valor
                // array.reduce(function(total, currentValue), initialValue)
                // total --> es en un principio el valor inicial (el primero)
                // initialValue --> Optional. A value to be passed to the function as the initial value
                uniqueIdStoriesArray.id = storyElement.id;
                uniqueIdStoriesArray.title = storyElement.title;
                uniqueIdStoriesArray.author_id = storyElement.author_id;
                uniqueIdStoriesArray.body = storyElement.body;
                uniqueIdStoriesArray.tagname.push(storyElement.tagname);
                return uniqueIdStoriesArray;
            }, {tagname: []}));
        });
        // console.log("Resultado final: ");
        // console.log(uniqueIdStories);


        res.render('showAll', { 
            pageTitle: 'showAll',
            stories: uniqueIdStories /* Array de objetos que puedo usar en la plantilla que tiene la info de TODOS los relatos Si un Relato tiene más de un tag ya NO aparecerá como dos objetos diferentes. */
            
        });
    })
    
    .catch(err => console.log(err));


};      