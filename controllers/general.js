// CONTROLLER

const Token = require('../util/Token'); // Cargamos el token

exports.getWho = (req, res, next) => {

    idUser = req.userId;

    res.render('whoWeAre', {
        pageTitle: 'who-we-are',
        token : Token.buildToken(idUser)
        
    });
};


