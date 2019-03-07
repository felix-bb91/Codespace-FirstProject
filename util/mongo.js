const dbMongoProps = require('./settingsMongo').dbMongo;
//require mongoose module
var mongoose = require('mongoose');

//require database URL from properties file
var dbURL = `mongodb://${dbMongoProps.host}:${dbMongoProps.port}/${dbMongoProps.db}`;



console.log("dbURL is: " + dbURL);
//export this function and imported by server.js
module.exports = function(){
  mongoose.connect(dbURL, { useNewUrlParser: true }); // Aquí ya habría conectado. useNewUrlParser: true --> La doc dice que es así y ya

  // Lo siguiente son eventos ligados al método on:

  //connected - error - disconnected --> son eventos ligados al método on
  mongoose.connection.on('connected', function(){
    console.log("Mongoose default connection is open to ", dbURL);
  });
  mongoose.connection.on('error', function(err){
    console.log("Mongoose default connection has occured " + err + " error");
  });
  mongoose.connection.on('disconnected', function(){
    console.log("Mongoose default connection is disconnected");
  });


  /* 
  Proceso que ocurrirá (on) cuando se pulse ctr+c (SIGINT) (parar la app):
        - Mira la DOC - 
  'SIGINT' from the terminal is supported on all platforms, and can usually be generated with <Ctrl>+C (though this may be configurable). It is not generated when terminal raw mode is enabled.

  */
  process.on('SIGINT', function(){
    mongoose.connection.close(function(){
      console.log("Mongoose default connection is disconnected due to application termination");
      process.exit(0)
    });
  });

  
}

