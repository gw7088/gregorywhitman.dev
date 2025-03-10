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
                                <li>Developed and implemented a sophisticated anomaly tracking system, analyzing diverse business metrics to promptly notify relevant team members to investigate root causes.</li>
                                <li>Helped build an Ad network capable of delivering billions of ads daily. System was capable of delivering targeted ads based on tracked user data. Also worked on ad optimization which automatically calculated best performing ads to deliver more often.</li>
                                <li>Leveraged Cloudflare services to build an automated threat detection system by leveraging an AI LLM and Puppeteer to evaluate websites for potential threats using content classification.</li>
                                <li>Integrated NodeJS applications with AWS services, including Gateway, Lambda, S3 and CloudWatch, optimizing operational efficiency and enhancing data management capabilities.</li>
                                <li>Expanded existing REST API functionality by designing and building new features to meet evolving business requirements.</li>
                                <li>Designed and implemented user-friendly UI that interacted with APIs and executed SQL queries, streamlining team members' workflow for seamless completion of business tasks.</li>
                                <li>Utilized NodeJS and SendGrid to construct and automate multiple recurring emails, conveying crucial insights into the businesses' recent performance.</li>
                                <li>Maintained and updated multiple NodeJS applications, ensuring smooth and reliable operation.</li>
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
                                <li>Wrote CRON jobs responsible for vital data collection, maintenance and manipulation.</li>
                                <li>Familiarity with front-end technologies, including Pug templates, for clean data rendering and enhanced data visualization.</li>
                                <li>Cleanly rendering data queried via databases and APIs for easy human visualization and consumption.</li>
                                <li>Excellent problem-solving and communication skills, demonstrated through collaborating with the lead software engineer on end-to-end feature development.</li>
                                <li>Proven ability to write effective UI tests to ensure software quality and robustness.</li>
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