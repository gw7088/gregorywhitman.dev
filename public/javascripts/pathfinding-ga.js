/**
 * Event handelers that call certain methods when certain assets
 * are clicked or certain events are complete
 */
function initHandlers(){

    $('.action').click(toggleActionClicked);

    // Rough way to change canvas size to fit devices...
    setTimeout(() => {
        var canvas = document.getElementById("__processing0");
        canvas.style.width = "80vw";
        canvas.style.height = "80vw";
        canvas.style.maxWidth = "600px";
        canvas.style.maxHeight = "600px";
        canvas.style.display = "inline-block";
        canvas.style.pointerEvents = "none";
      }, "200");
}




function toggleActionClicked(){
    if($(this).hasClass('started')){ // If started. Steps to stop processing code.
        $(this).removeClass('started');
        $(this).text('Start');
    }
    else{ // If stopped. Steps to start processing code.
        $(this).addClass('started');
        $(this).text('Stop');
    }
}



/**
 * All the page requirements that need to be loaded from the start.
 */
function init(){
    initHandlers();
}



/**
 * Setup everything on page loaded.
 */
$(document).ready(function(){
     init();
});