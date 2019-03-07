// npm install jsonwebtoken --save

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const SECRET = require('./salt').salt; // get our config file and save the info inside salt into SECRET. In this way we do not need to call later SECRET ad SECRET.salt. with SECRET is enough




function buildToken (key) { // Key deberá ser un dato único por usuario, el id en este caso.
  // create a token
  var token = jwt.sign({ id: key }, SECRET, {
    //expiresIn: 86400 // expires in 24 hours
    expiresIn: 3600 // expires in 1 hour
  });
  return token;
}

/* Ahora vienen las funciones de verificar el token. 
A continuación aparecen 2, lo normal es usar o una u otra. 
Guardando el token en la URL o en el header: verifyParam o verifyToken */


function verifyParam(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.params.token;
    if (!token)
      return res.status(403).send({ auth: false, message: 'Bad credentials' });
  
    // verifies secret and checks exp
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  
      // if everything is good, save to request for use in other routes
      req.userId = decoded.id;
      /* Esto sirve para meter info en la req que luego podrá usar la siguiente ruta,
      algo como el req.body por ejemplo, solo que en este caso somos nosotros los que
      creamos un parámetro en la request con el nombre userId y meto la info a 
      partir de la cual construí el token, que fue el id (mira build token) */
      next(); // Función que será usada como middleware
    });
  }







  
  // NO USADA
  function verifyToken(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.header('x-access-token');
    if (!token)
      return res.status(403).send({ auth: false, message: 'Bad credentials' });
  
    // verifies secret and checks exp
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  
      // if everything is good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  }
  


module.exports = {
  verifyToken,
  buildToken,
  verifyParam

};

