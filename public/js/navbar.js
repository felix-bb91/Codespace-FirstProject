$(document).ready(function(){

    
    let userIdX = StorageManager.bringUserId();
    var token = document.getElementsByClassName("myToken")[0].id;


    //$('.myProfileNav2').attr('href', `/myProfile/${token}`);

    $('#myModalTags').appendTo("body"); // Para que el modal aparezca

    
    $('.addStory').attr('action', `/addStory/${userIdX}/${token}`);


});

