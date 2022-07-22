/**
 * Event handelers that call certain methods when certain assets
 * are clicked or certain events are complete
 */
function initHandlers(){
    // Btn Handlers
    $('.action').click(toggleActionClicked);
    $('.reset').click(toggleResetClicked);
    
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("header-wrapper").style.top = "0";
    } 
    else {
        if(!$('.hamburger-icon').hasClass('open')){
            document.getElementById("header-wrapper").style.top = "-100px";
        }
    }
        prevScrollpos = currentScrollPos;
    }
}




/**
 * Starts stop canvas code from running.
 */
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
 * Resets all GA settings.
 */
function toggleResetClicked(){
    // if($(this).hasClass('resetting')){ // If started. Steps to stop processing code.
    //     $(this).removeClass('resetting');
    // }
    // else{ // If stopped. Steps to start processing code.
    //     $(this).addClass('resetting');
    // }

    $(this).addClass('resetting');

    // Start to stop
    if($('#action').hasClass('started')){ // If started. Steps to stop processing code.
        $('#action').removeClass('started');
        $('#action').text('Start');
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