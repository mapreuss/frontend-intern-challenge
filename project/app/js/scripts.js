$(document).ready(function(){
    
    // Hide and show label, when press a letter or paste an URL
    $("#longURL").one("keypress", function(){ hideLabel() });
    $("#longURL").bind("paste", function(){ hideLabel() });

    // Result
    $("#formURL").submit(function(e){
        e.preventDefault();
        result();
    });

    // Top5
    topfive();

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
    var buttonText = $("#submitButton").text();
    if(buttonText == "Encurtar"){
        $("#longURL").addClass("result");
        $("#longURL").val("http://chr.dc/xyzxyz");
        $("#resetButton").fadeIn(350).on("click", function() {reset()});
        $("#submitButton").text("Copiar");
    } else {
        $("#longURL").select();
        document.execCommand('copy');
        reset();
    }
}

function reset(){
    $("#resetButton").fadeOut(350);
    $("#longURL").removeClass("result"); 
    $("button").text("Encurtar");
    $("#longURL").val("");
    showLabel();
}

//---

function topfive(){

    jQuery.ajax({
        'url': "js/links.json",
        'dataType': "json"
    })
    .done(function(data) {
        displayData(data);
    })
    .fail(function() {
        displayData(false);
    });
    
}

function displayData(json){
    var $resultDisplay = jQuery('#topfiveList');

    if (!json) {        
        $resultDisplay.html('<li>Opa, algo deu errado</li>');        
    } else if (jQuery.isEmptyObject(json)) {        
        $resultDisplay.html('<li>Sem dados por enquanto</li>');        
    } else {
        $resultDisplay.empty();
        json = _.orderBy(json, "hits", 'desc');
        json = _.dropRight(json, 5);
        renderSorted("#topfiveList", json);
    }
}

function renderSorted(selector, elements) {
    $.each(elements, function(index, item) {
        $(selector).append('<li>' + 
        '<a href="' + item.url + '" target="_blank">' + item.shortUrl + '</a>' +
        '<span>' + item.hits + '</span>' +
        '</li>');
        });
};