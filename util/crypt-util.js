// npm install crypto --save
// Esto es encriptar la password, no confundir con generar el token, no tiene nada que ver.
// https://nodejs.org/api/crypto.html#crypto_crypto


var crypto      = require('crypto'),
    cipher_seed = 'U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy';



const encrypt = function(text) {

    // si miras la doc, hay un ejemeplo y es así:

    var cipher  = crypto.createCipher('aes-256-cbc', cipher_seed);
    // aes-256-cbc --> Es el algoritmo de encriptación. 256 es la longitud en bits. A más largo, más difícil y segura.
    // cipher_seed --> Es una cadena de caracteres aleatoria que se usará en la encriptación

    var crypted = cipher.update(text, 'utf8', 'hex');
    // cipher.update(data[, inputEncoding][, outputEncoding])

    crypted += cipher.final('hex');
    // cipher.final([outputEncoding])

    return crypted; // Un console log daria algo tipo: 5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa

};


// Este módulo es para desencriptar las contraseñas. En este proyecto no se usa y normalmente
// no se suele usar.
const decrypt = function(text) {
    var decipher  = crypto.createDecipher('aes-256-cbc', cipher_seed),
        decrypted = decipher.update(text, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted;
};


module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;