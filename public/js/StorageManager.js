function StorageManager(){}
// Clase estática para ENCAPSULAR código
// No almacena información, ni crea contenido, solo ejecuta métodos
// Una clase estática nunca se va a instanciar (no vas a ver new ClaseEstática)
// Métodos estáticos


StorageManager.bringToken = function() {

    // Traigo del session el id para luego introducirlo en el action del 
    // navbar para poder hacer click en ver mi perfil
    let jToken = sessionStorage.getItem('userTk');
    let token = JSON.parse(jToken);
   
    let tokenX = token.tk;

    return tokenX;
};


StorageManager.saveToken = function() {

    // Traemos el token del usuario del HTML
    let token = document.getElementsByClassName("myToken")[0].id;
    // Creo el objeto jSon
    let jToken = {tk: token};
    // Lo almaceno
    jToken = JSON.stringify(jToken);
    sessionStorage.setItem("userTk", jToken);

};


StorageManager.bringUserId = function() {

    // Traigo del session el id para luego introducirlo en el action del 
    // navbar para poder hacer click en ver mi perfil
    let jUserId = sessionStorage.getItem('userId');
    let userId = JSON.parse(jUserId);
   
    let userIdX = userId.id;

    return userIdX;
};


StorageManager.saveUserId = function() {

    // Traemos el token del usuario del HTML
    let userId = document.getElementsByClassName("profileId")[0].id;
    //console.log(idUser);
    // Creo el objeto jSon
    let jUserId = {id: userId};
    // Lo almaceno
    jUserId = JSON.stringify(jUserId);
    sessionStorage.setItem("userId", jUserId);

};


