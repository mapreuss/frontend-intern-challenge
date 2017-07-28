$(document).ready(function(){
    
    // Hide and show label, when press a letter or paste an URL
    $("#longURL").one("keypress", function(){ hideLabel() });
    $("#longURL").bind("paste", function(){ hideLabel() });

    // Result
    $("#formURL").submit(function(e){
        e.preventDefault();
        result();
    });

});


function hideLabel(){
    $("#labelLongURL").hide();
    $("#longURL").on("blur", function(){ showLabel(); });
}

function showLabel(){
    var inputSize = $("#longURL").val().length;
    if(inputSize === 0){
        $("#labelLongURL").show();
    }
}

function result(){
    $("#submitButton").animate({ color: 'red' }, 500);
    
    $("#submitButton").text("Copiar");
    
    
    $("#longURL").addClass("result");
    $("#longURL").val("http://chr.dc/xyzxyz");
    $("#resetButton").fadeIn(350).on("click", function() {reset()});
}

function reset(){
    $("#resetButton").fadeOut(350);
    $("#longURL").removeClass("result"); 
    $("button").text("Encurtar");
    $("#longURL").val("");
    showLabel();
}