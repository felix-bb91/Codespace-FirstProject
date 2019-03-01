// CONTROLLER

const User = require('../models/users');
const crypt = require('../util/crypt-util'); // usar el módulo crypt
// npm install crypto --save
const Token = require('../util/Token'); // Cargamos el token


// Show the login page
exports.getLogin = (req, res, next) => {
    
    res.render('startSession', { // RUTA PLANTILLA dentro de views de Pagina incial
        pageTitle: 'login-page',
        error: false, // ver postLogin
        message: false // ver postRegister
    });
     
};

// Login button clicked
exports.postLogin = (req, res, next) => {
    
    const authType = req.body.authType;
    /* 
    PARA REACT:
    en la plantilla startsession se ha creado un input oculto de value=form.
    Ese valor luego lo podremos modificar desde React para hacer cosas.
    Ahora mismo esto no tiene mucho sentido pero cuando veamos react esto es necesario ya que react necesita de un json 
    */


    const username = req.body.user; // attr Name = "user" en la view 
    const password = req.body.password;  // No ecriptada - Hay que comparar con la encriptada en DB

    const cryptPasswd = crypt.encrypt(password); 

    User.login(username, cryptPasswd)
    .then(([row]) => {
        //console.log(row);   // Vemos que da un array de objetos

        if (row[0]){ // Si recibo algo en id es que el user existe
            //console.log("ok");

            // User y pass ya son correctos --> Creo el token
            let myToken = Token.buildToken(row[0].id); // usamos el dato que es único para cada usuario a la hora de construir el token.    

            if(authType == "form"){
                res.render('myProfile', { // Home
                    pageTitle: 'myProfile',
                    user: row[0], // Variable que puedo usar en la plantilla que tiene la info del usuario
                    token : myToken
                });
            }

            else{ // Para React - Necesitará un jSon
                const jLogin = {
                    token : myToken
                }
                res.send(jLogin);
            }
            
            
       }
       else { // Si no hay usuario con esos datos:
        
            res.render('startSession', { // Pagina incial
                pageTitle: 'login-page',
                error: 'Datos incorrectos', // Añadir pop-up con alerta jquery
                message: false
            });  
       }
    })
    .catch(err => console.log(err));

};



// Show the register page
exports.getRegister = (req, res, next) => {
    
    res.render('register', { // RUTA PLANTILLA dentro de views de Pagina incial
        pageTitle: 'register',
        error: false, // ver postLogin
        message: false // ver postRegister
    });
     
};



// Register
exports.postRegister = (req, res, next) => {
    
    const id = req.body.id;
    const username = req.body.user; // attr Name = "user" en la view 
    const password = req.body.password; // password que habrá que encriptar
    const mail = req.body.mail;
    const country = req.body.country;
    const city = req.body.city;
    const register_date = req.body.register_date;
    const info = req.body.info;
    const img = req.body.img;


    //UserEncrypted - admin - c29102fd07cb584fd7306896eccc5db0

    const cryptPasswd = crypt.encrypt(password); // la del form, original, la encriptamos
    //console.log(cryptPasswd);


    const user = new User (null, username, mail, country, city, cryptPasswd, null, null, null);
    //console.log(user);
    user
    .registerUser()
    .then(() => {
        res.render('startSession', { // RUTA PLANTILLA Pagina incial
            pageTitle: 'login-page',
            error: false, 
            message: 'Usuario registrado correctamente, por favor inicie sesión.' // Crear alerta
        });
    })
    .catch(err => console.log(err));

};




