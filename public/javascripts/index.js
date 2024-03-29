/**
 * Event handelers that call certain methods when certain assets
 * are clicked or certain events are complete
 */
function initHandlers(){
    // Socket message handlers
    socket.on('contact email sent',onContactEmailSent);

    // Setups
    transitionAnimations();
    setupModalFunc();

    // Interactions
    // $('.hamburger-icon').click(toggleMobileMenu);
    $('.job-selector').click(jobSelector);
    $('.project-see-more .btn-pixel').click(seeMoreProjectsClicked);
    $('.contact-send').click(send_contact_mail);
    $('[data-toggle="tooltip"]').tooltip( {trigger : 'hover'} );
}



/**
 * Button handler for when 'see more' projects btn
 * clicked
 */
function seeMoreProjectsClicked(){
    // Check if menue is open.
    if($('#more-projects').hasClass('open')){ // If open. Steps to close it.
        $('#more-projects').removeClass('open');
        $(this).html('See More?');
    }
    else{ // If closes. Steps to open it.
        $('#more-projects').addClass('open');
        console.log(this);
        $(this).html('Hide Projects?');
    }
}



/**
 * Send email via sendgrid, rip data from 
 * contact modal.
 */
function send_contact_mail(){
    let data = {};
    // Rip message contents from here...
    data.fname = $('#fname').val();
    data.email = $('#email').val();
    data.message = $('#modal-message').val();

    if(!validateContactInfo(data)) return;

    // Send data to server to be sent.
    socket.emit('send contact email',data);
}



/**
 * 
 * @param {Object} data Contains the information from the contact form.
 */
function validateContactInfo(data){
    // Check name and message
    if(data.fname=='' || data.message==''){
        showToastError('Please enter a name and message');
        return false;
    }
    // Check email
    let email = data.email;
    let emailFlag = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(!emailFlag){
        showToastError('Please enter a valid email... (So I can get back to you!)');
        return false;
    }
    // Everything looks good.
    return true;
}



/**
 * Handle u/i based on server response of
 * sending sendgrid email.
 */
function onContactEmailSent(data){
    // No matter what. Close contact modal.
    clearAndCloseModal();
    // If success, show toast alert.
    if(data.success){
        return showToastAlert(data.message);
    }
    else{
        return showToastError(data.message);
    }
}



/**
 * Clears and closes contact modal.
 */
function clearAndCloseModal(){
    // Close contact modal.
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    // Clear contact modal.
    $('#fname').val('');
    $('#email').val('');
    $('#modal-message').val('');
}
    


/**
 * Intersection Observer setups for 
 * animations.
 */
function transitionAnimations(){
    // Fader
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in');
    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -250px 0px"
    };
    const appearOnScroll = new IntersectionObserver
    (function(
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            // Check if intersecting
            if(!entry.isIntersecting){
                return;
            }
            else{
                // Is intersecting. Add class.
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    // Faders
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    // Sliders
    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });
}



/**
 * Sets up basic contact modal pop up/close.
 */
function setupModalFunc(){
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the buttons that opens the modal
    var btn = document.getElementById("myBtn");
    var btn2 = document.getElementById("myBtn2");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
        // Hide tooltips
        setTimeout(() => { $('.tooltip').hide(); }, 50);
    }
    btn2.onclick = function() {
        modal.style.display = "block";
        // Hide tooltips
        setTimeout(() => { $('.tooltip').hide(); }, 50);
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}



/**
 * Switches content displayed in Job div depending on
 * what tab was clicked.
 */
function jobSelector(){
    let clicked = $(this).attr('data');
    let array = [`<div class="job1">
                        <div class="job-title1">
                            <div class="job-header1">
                                <div class="h2"><span class="job-header-title">Full Stack Developer<span class="job-header-company"> @ Digital Media Solutions</span></span></div>
                            </div>
                            <div class="job-header1-sub"><span>February 2021 - Present</span></div>
                        </div>
                        <div class="job-body1">
                            <ul>
                                <li>Designed and built a system to track statistical anomalies across various business metrics to alert proper team members to investigate the cause of these anomalies.</li>
                                <li>Integrated NodeJS applications with AWS services such as S3 and Cloudwatch.</li>
                                <li>Built new features on top of the existing REST API.</li>
                                <li>Gained hands on experience using AWS services such as EC2, Gateway, Lambda and more.</li>
                                <li>Designed and built U/I that interacts and modifies data via APIs and SQL queries to assist team members with completing business tasks.</li>
                                <li>Built multiple recurring emails using NodeJS and SendGrid that contained vital information about the businesses recent performance.</li>
                                <li>Responsible for maintaining various NodeJS applications.</li>
                            </ul>
                        </div>
                    </div>`,
                    `<div class="job1">
                        <div class="job-title1">
                            <div class="job-header1">
                                <div class="h2"><span class="job-header-title">Jr. Web Developer <span class="job-header-company">@
                                            PushPros</span></span></div>
                            </div>
                            <div class="job-header1-sub"><span>January 2020 - February 2021</span></div>
                        </div>
                        <div class="job-body1">
                            <ul>
                                <li>Bug fixes within internal/external facing dashboards.</li>
                                <li>Wrote CRON jobs responsible for automatic data collection, maintenance and manipulation.</li>
                                <li>Gained hands on experience with Bootstrap, Express, Pug and NodeJS.</li>
                                <li>Gained hands on experience using AWS services such as EC2.</li>
                                <li>Cleanly rendering data queried via databases and APIs for easy human visualization and consumption.</li>
                                <li>Worked closely with the lead software engineer to take an feature from front to back.</li>
                                <li>Wrote U/I tests.</li>
                            </ul>
                        </div>
                    </div>`
                ];
    $('.job1').html(`${array[clicked]}`);


    // Remove from all other tabs
    $('.tab-list ul li').each(function () {
        $(this).removeClass('selected');
    });

    // Add higlight to tab list of company selected
    $(`.tab-list ul li[data="${clicked}"`).addClass('selected');
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