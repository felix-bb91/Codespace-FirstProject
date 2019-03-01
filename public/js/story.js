// Función que coge del "Botón de leer más" el id (es el id de la propia story) y lo usa para mandar a la ruta concreta del relato.

function getTheId(anchor) {
    var idStory = anchor.getAttribute('id');
    //alert(idStory);
    document.getElementById(idStory).href=`/story/${idStory}`; 
}