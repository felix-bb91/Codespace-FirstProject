$(document).ready(function(){

    // Traemos el id del usuario del HTML
    let token = document.getElementsByClassName("profile")[0].id;
    //console.log(idUser);
    // Creo el objeto jSon
    let jToken = {tk: token};
    // Lo almaceno
    jToken = JSON.stringify(jToken);
    sessionStorage.setItem("userTk", jToken);





    



});
