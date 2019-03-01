$(document).ready(function(){

    // Traigo del session el id para luego introducirlo en el action del 
    // navbar para poder hacer click en ver mi perfil
    let jToken = sessionStorage.getItem('userTk');
    let token = JSON.parse(jToken);
   
    let tokenX = token.tk;
    $('.myProfileNav2').attr('href', `/myProfile/${tokenX}`);

    $('#myModalTags').appendTo("body"); // Para que el modal aparezca

});

