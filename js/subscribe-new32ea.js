$(document).ready(function(e) { 
    $('.js-conveyor-1').jConveyorTicker();
    $('.subscribe-prdt').click(showSubOption);
    $('.gift-prdt').click(showGiftSubOption);

    $('.img-slide-sec').owlCarousel({
        autoplay:true,
        dots: false,
        nav: false,
        navText: [ '', '' ],
        //rewind:true,            
        loop:true,
        AutoHeight:true,
        items:1,
        animateIn: 'fadeIn', 
        animateOut: 'fadeOut',
        responsive:{
            0:{ items:1 }
        }
    });

    $('.drop-slide').owlCarousel({
        autoplay: true,
        items: 1,
        loop: true,
        margin: 5,
        dots: false,
        nav: true,
        navText: [ '<i class="glyphicon glyphicon-menu-left"></i>', '<i class="glyphicon glyphicon-menu-right"></i>' ],
        autoplayTimeout: 1000,
        smartSpeed: 1000,
        autoHeight: true,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            850: {
                items: 3
            },
            1230: {
                items: 4
            },
            1630: {
                items: 5
            }
        }
    });
    
});
function showSubOption() {
    $('#imgDiv').hide();
    $('#subDiv').show();
    $('html, body').stop().animate({
        'scrollTop': $("#subDiv").offset().top-100
    }, 900, 'swing');	
}
function showGiftSubOption() {
    window.isGiftSub = true;
    $('#imgDiv').hide();
    $('#subDiv').show();
    $('html, body').stop().animate({
        'scrollTop': $("#subDiv").offset().top-100
    }, 900, 'swing');	
}