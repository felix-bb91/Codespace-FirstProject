// CONTROLLER

const User = require('../models/users');
const formidable = require('../node_modules/formidable'); // Para poder manejar ficheros en la edición del perfil
const Token = require('../util/Token'); // Cargamos el token



// Remove User
exports.postRemoveUser = (req, res, next) => {
    
    const idUser = req.userId; 
    /* Este id viene especificado en la ruta, la coge del HTML (que es variable dentro del action y coincide con el id). Params recoge lo último de la ruta */
    User.removeUser(idUser) 
    .then(() => { 
        res.redirect('/');
    })
    .catch(err => console.log(err));
};



// Get myProfile
exports.getProfile = (req, res, next) => {
    
    const idUser = req.userId; // en Token.js modificamos el req para añadir este parámetro
    
    User.getUserByID(idUser)
        .then(([row]) => {
            res.render('myProfile', { 
                
                pageTitle: 'myProfile',
                user: row[0], // Variable que puedo usar en la plantilla que tiene la info del usuario
                token : Token.buildToken(idUser) // usamos el dato que es único para cada usuario a la hora de construir el token
            });
    })
    .catch(err => console.log(err));


};





// Post EDIT myProfile

exports.saveImg = (req, res) => {
    
    const idUser = req.userId; 
    //console.log(idUser);
    var form = new formidable.IncomingForm(); // Creo un formulario
    form.parse(req); // Parseo la request
    // Cuando empiece la transferencia:
    form.on('fileBegin', function (name, file){ 
        let whereTheFileWillBe = __dirname + '/../public/images/uploads/' + file.name; // ruta donde irá temporalmente el fichero
        file.path = whereTheFileWillBe; // Cambio la ruta por defecto a la que yo he dicho
        //console.log("Imagen subiendose");
        //console.log(whereTheFileWillBe);
    });
    // Cuando se haya realizado la transferencia:
    form.on('file', function(name,file){
        
        //console.log('Uploaded ' + file.name);
        const fileRelativePath = '/images/uploads/' + file.name;
        // Guarda URL Img en DDBB
        User.postImg(idUser, fileRelativePath)
        .then(([]) => {
            // Una vez guardada la muestro en pantalla
            return User.getUserByID(idUser)})
                .then(([row]) => {
                    //console.log(row);   // Vemos que da un array de objetos
                    res.render('myProfile', { 
                        pageTitle: 'myProfile',
                        user: row[0], // Variable que puedo usar en la plantilla que tiene la info del usuario
                        token : Token.buildToken(idUser) // usamos el dato que es único para cada usuario a la hora de construir el token
                    });
                
                })
        .catch(err => console.log(err));

    });
    
};


































