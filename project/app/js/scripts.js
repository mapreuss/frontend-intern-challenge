$(document).ready(function(){
    
    // Hide and show label
    hideLabel();
    
});


function hideLabel(){
    $("#longURL").one("keypress", function () {
        $("#labelLongURL").hide();
        showLabel();
    });
}

function showLabel(){
    $("#longURL").on("blur", function(){
        var inputSize = $("#longURL").val().length;
        if(inputSize === 0){
            $("#labelLongURL").show();
            hideLabel();
        }
    });
}
