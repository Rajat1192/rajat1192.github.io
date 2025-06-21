/*======== Window Load Function ========*/
$(window).on('load', function(){

    /*======== Preloader Setup ========*/
    $(".loading-text").delay(1000).fadeOut("slow");
    $(".preloader").delay(2000).fadeOut("slow");

    /*======== Isotope Setup ========*/
    if ($('.portfolio-items').length) {
        var $elements = $(".portfolio-items"),
            $filters = $('.portfolio-filter ul li');
        $elements.isotope();
        $filters.on('click', function() {
            $filters.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).data('filter');
            $(".portfolio-items").isotope({
                filter: selector,
            });
        });
    }
});
/*======== Document Ready Function ========*/
$(document).ready(function() {
    "use strict";

    /*======== Text Slideshow Setup ========*/
    if($('.text-slideshow').length) {
        animateText();
    }

    /*======== SimpleBar Setup ========*/
    $('.pages-stack .page').each(function() {
        var $id = '#' + $(this).attr('id');
        new SimpleBar($($id)[0], {
            scrollbarMinSize: 15
        });
    });


    /*======== Portfolio Image Link Setup ========*/
    $('.portfolio-items .image-link').magnificPopup({
        type: 'image',
    });

    /*======== Portfolio Video Link Setup ========*/
    $('.portfolio-items .video-link').magnificPopup({
        type: 'iframe',
    });

    /*========Testimonials OwlCarousel Setup========*/
    $(".testimonials .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        dots: false,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            800: {
                items: 1,
            },
            992: {
                items: 2,
            },
        },
    });

    /*========Clients OwlCarousel Setup========*/
    $(".clients .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 2,
            },
            575: {
                items: 3,
            },
            768: {
                items: 4,
            },
            1000: {
                items: 6,
            },
        },
    });

    /*======== Contact Form Setup ========*/
    contactFormSetup();

});


/********** Function Contact Form Setup **********/
function contactFormSetup() {

    /*======== Check Field Have Value When Page Load ========*/
    $('.input-field').each(function() {
        if($(this).val()) {
            $(this).addClass('input--filled');
        } else {
            $(this).removeClass('input--filled');
        }
    });

    /*======== Check Field Have Value When Keyup ========*/
    $('.input-field').on('keyup', function() {
        if($(this).val()) {
            $(this).addClass('input--filled');
        } else {
            $(this).removeClass('input--filled');
        }
    });


    $('#contact-form').on('submit', function (e) {
        e.preventDefault();

        var name = $('#rp-name').val(),
            email = $('#rp-email').val(),
            message = $('#rp-message').val(),
            required = 0;

        $('.rp-validate', this).each(function () {
            if ($(this).val() === '') {
                $(this).addClass('cf-error');
                required += 1;
            } else {
                $(this).removeClass('cf-error');
            }
        });

        if (required === 0) {
            $.ajax({
                url: "https://usebasin.com/f/b0e1309cca27",
                method: "POST",
                data: {
                    name: name,
                    email: email,
                    message: message,
                    _honey: "",
                    _captcha: "false"
                },
                success: function () {
                    $('#contact-form .input-field').val('');
                    showAlertBox(200, "Thank you for reaching out to us. We will get back to you soon!");
                },
                error: function () {
                    showAlertBox(500, "Oops! Something went wrong. Please try again later.");
                }
            });
        }
    });

}

/********** Function Show Alert Box **********/
function showAlertBox(response, message) {
    var $alertBox = $('<div class="alert"></div>'),
        $alContainer = $('#contact-form .alert-container');
    if( response == 200 ) {
        $alertBox.addClass('alert-success').html(message);
        $alContainer.html($alertBox);
    } else {
        $alertBox.addClass('alert-danger').html(message);
        $alContainer.html($alertBox);
    }
    $alContainer.fadeIn(300).delay(2000).fadeOut(400);
}
