// Función que coge del "Botón de leer más" el id (es el id de la propia story) y lo usa para mandar a la ruta concreta del relato.

function getTheId(button) {
    var idStory = button.getAttribute('id');
    var token = document.getElementsByClassName("myToken")[0].id;

    document.getElementById(idStory).href=`/story/${idStory}/${token}`; 
}

