/**
 * Event handelers that call certain methods when certain assets
 * are clicked or certain events are complete
 */
function initHandlers(){
    showToastError('Redirecting you back to the homepage');
    setTimeout(() => {
        window.location.replace("https://gregorywhitman.dev");
    }, 5000);
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