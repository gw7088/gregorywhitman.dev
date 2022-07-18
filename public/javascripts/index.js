/**
 * Event handelers that call certain methods when certain assets
 * are clicked or certain events are complete
 */
function initHandlers(){
    // Setups
    navBarFadeIn();
    transitionAnimations();
    setupModalFunc();

    // Interactions
    $('.hamburger-icon').click(toggleMobileMenu);
    $('.job-selector').click(jobSelector);
}



/**
 * Test send mail via sendgrid
 */
function testSendMail(){
    socket.emit('send contact email');
}


/**
 * Expands Mobile menu
 */
function toggleMobileMenu(){
    if($(this).hasClass('open')){
        $(this).removeClass('open');
        document.getElementById("menue").classList.remove("open");
        document.getElementById("content").classList.remove("open");
        var header = document.getElementById("header-wrapper");
        header.style.backgroundColor = "rgb(10 25 47 / 71%)";
    }
    else{
        $(this).addClass('open');
        document.getElementById("menue").classList.add("open");
        document.getElementById("content").classList.add("open");
        var header = document.getElementById("header-wrapper");
        header.style.backgroundColor = "rgb(210 105 30 / 0%)";
    }
}



/**
 * Fades Nav Bar in/out from the top of page.
 */
function navBarFadeIn(){
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("header-wrapper").style.top = "0";
    } else {
        if(!$('.hamburger-icon').hasClass('open')){
            document.getElementById("header-wrapper").style.top = "-100px";
        }
    }
        prevScrollpos = currentScrollPos;
    }
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
    }
    btn2.onclick = function() {
        modal.style.display = "block";
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
                                <div class="h2"><span class="job-header-title">Full Stack Web Developer<span class="job-header-company"> @ Digital Media Solutions</span></span></div>
                            </div>
                            <div class="job-header1-sub"><span>February 2021 - Present</span></div>
                        </div>
                        <div class="job-body1">
                            <ul>
                                <li>Designed and built a system to track statistical anomalies across various business metrics to alert proper team members to investigate the cause of these anomalies.</li>
                                <li>Integrated NodeJS applications with AWS services such as S3 and cloudwatch.</li>
                                <li>Built new features on top of the existing REST API.</li>
                                <li>Gained hands on experience using AWS services such as EC2.</li>
                                <li>Designed and built U/I that interacts and modifies data via APIs and SQL queries to assist team members with completing buisness tasks.</li>
                                <li>Built multiple recurring emails using NodeJS and SendGrid that contained vital information about the buisnesses recent performance.</li>
                                <li>Gained experience working with AWS services such as Gateway and Lambda.</li>
                                <li>Maintained various NodeJS applications.</li>
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
                                <li>Wrote CRON jobs responsible for vital data collection, maintenece and manipulation.</li>
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