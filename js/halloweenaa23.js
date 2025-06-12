$(document).ready(function(e) { 
    $('.testi-slide').owlCarousel({
        autoplay:true,
        dots: false,
        nav: true,
        navText: [ '<i class="glyphicon glyphicon-menu-left"></i>', '<i class="glyphicon glyphicon-menu-right"></i>' ],
        loop:true,
        AutoHeight:true,
        items:1,
        responsive:{
            0:{ items:1 }
        }
    });
}); 