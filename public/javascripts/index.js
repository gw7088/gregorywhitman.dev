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
                                <div class="h2"><span class="job-header-title">Full Stack Developer (Contract)<span class="job-header-company"> @ Intentwave</span></span></div>
                            </div>
                            <div class="job-header1-sub"><span>January 2026 - Present</span></div>
                        </div>
                        <div class="job-body1">
                            <ul>
                                <li>Building a production React dashboard, architecting component structure, state management, and API integration patterns for a data-intensive internal tooling platform.</li>
                                <li>Designing and developing a PHP REST API backend to support the dashboard, including endpoint design, authentication, and database query optimization.</li>
                                <li>Designed and deployed a real-world page and session tracking system using WebSockets and Cloudflare Durable Objects on Cloudflare infrastructure, handling millions of concurrent users daily.</li>
                                <li>Collaborating closely with stakeholders to translate business requirements into technical solutions, owning features end-to-end from architecture through deployment.</li>
                                <li>Conducting code reviews and contributing to engineering standards and best practices across the team.</li>
                            </ul>
                        </div>
                    </div>`,
                    `<div class="job1">
                        <div class="job-title1">
                            <div class="job-header1">
                                <div class="h2"><span class="job-header-title">Full Stack Developer<span class="job-header-company"> @ Digital Media Solutions (Aimtell)</span></span></div>
                            </div>
                            <div class="job-header1-sub"><span>February 2021 - December 2025</span></div>
                        </div>
                        <div class="job-body1">
                            <ul>
                                <li>Maintained an ad delivery network capable of processing billions of targeted ad impressions daily, incorporating real-time optimization logic to automatically promote best-performing ads.</li>
                                <li>Maintained a high-throughput Kafka pipeline for queuing and delivering billions of push notifications per day, designing producers, consumers, and retry/dead-letter strategies for reliability at scale.</li>
                                <li>Leveraged AWS Lambda, API Gateway, S3, and CloudWatch to build serverless microservices, improving operational efficiency and decoupling system components.</li>
                                <li>Built an automated threat detection platform using Cloudflare Workers, an AI/LLM classifier, and Puppeteer to crawl and evaluate websites for malicious content.</li>
                                <li>Expanded and maintained REST API surface area, designing new endpoints and integrating third-party services to support evolving product requirements.</li>
                                <li>Designed internal admin UIs that interfaced with APIs and executed SQL queries, enabling non-technical team members to manage business operations efficiently.</li>
                                <li>Built automated reporting pipelines using Node.js and SendGrid, delivering scheduled performance insights across multiple business units.</li>
                            </ul>
                        </div>
                    </div>`,
                    `<div class="job1">
                        <div class="job-title1">
                            <div class="job-header1">
                                <div class="h2"><span class="job-header-title">Jr. Web Developer<span class="job-header-company"> @ PushPros</span></span></div>
                            </div>
                            <div class="job-header1-sub"><span>January 2020 - February 2021</span></div>
                        </div>
                        <div class="job-body1">
                            <ul>
                                <li>Developed an anomaly detection system that continuously analyzed business metrics and triggered real-time alerts to the appropriate team members for investigation.</li>
                                <li>Wrote CRON jobs responsible for critical data collection, transformation, and maintenance tasks.</li>
                                <li>Built front-end interfaces using Pug templates for clean rendering and visualization of data sourced from databases and APIs.</li>
                                <li>Collaborated with the lead engineer on end-to-end feature development, from requirements through QA.</li>
                                <li>Wrote automated UI tests to validate software quality and prevent regressions.</li>
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