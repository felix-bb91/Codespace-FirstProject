'use strict'; 
// Es una forma de forzar a que lo que incluya este fichero tenga un formato estricto
// Si decimos que name es un String, estamos forzando a que lo sea. Estamos usando tipado fuerte
// en javascript.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MODEL_NAME = "access";  // Para mongoose - ORM


// Definición del ORM
const AccessSchema = new Schema({

    userId: {
        type: Number,
        required: true,
    },
    onDate: {
       
        type: Date,
        default: Date.now,
 
    },
    regLog: Number,  // 0: Registro - 1: Login
  
});


mongoose.model(MODEL_NAME, AccessSchema); 
// Le dice a mongoose que de de alta el modelo que acabo de crear bajo el nombre de "customer"


module.exports = {
  model: mongoose.model(MODEL_NAME), // Lo exporto
  
};







