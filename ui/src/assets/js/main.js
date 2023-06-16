/*
==============================
    Template Name: Alice Fashion Responsive Bootstrap Template
    Description: This is html5 template
    Author: HasTech
    Version: 1.0
====================================

==============================================
Table Of Contents
==============================================

00. Top banner hide
01. Top Menu Stick
02. jQuery SlickNav
03. Url Active Class
04. SmoothSroll
05. Scrollspy
06. Category menu
07. DateCount
08. Deals Items
09. New arrival Item style 2
10. New arrival Items
11. Multiple Items (Random Products)
12. Multiple Items
13. Box Items
14. Different Items
15. Blog Slider
16. Clients Logo
17. Bos Items 2
18. Price Slider
19. Cart Plus Minus
20. ScrollUp

*/


(function ($) {
 "use strict";

/*====================
00. Top banner hide
=====================*/

$('.close-section-btn').on('click', function(){
    $(this).parents('.top-banner-area').addClass('hide-top-banner');
});

/*******************
01. Top Menu Stick
********************/
    var sticky_menu = $('#sticker, #sticker-mobile');
    var pos = sticky_menu.position();
    if (sticky_menu.length) {
        var windowpos = sticky_menu.offset().top;
        $(window).on('scroll', function() {
            var windowpos = $(window).scrollTop();
            if (windowpos > pos.top) {
                sticky_menu.addClass('stick');
            } else {
                sticky_menu.removeClass('stick');
            }
        });
    }

/*******************
02. jQuery SlickNav
********************/
    $('.mainmenu').slicknav({
        label: 'menu',
        duration: 700,
        easingOpen: "easeOutBounce",
        prependTo: '#mobileMenu',
        closeOnClick: true
    });

/*******************
03. Url Active Class
********************/
    $(function() {
        var pgurl = window.location.href.substr(window.location.href
                                                .lastIndexOf("/")+1);
        $(".mainmenu a").each(function(){
            if($(this).attr("href") === pgurl || $(this).attr("href") === '' )
                $(this).addClass("active");
        })
    });

    /*********** li active class ***********/
    var cururl = window.location.pathname;
    var curpage = cururl.substr(cururl.lastIndexOf('/') + 1);
    var hash = window.location.hash.substr(1);
    if((curpage === "" || curpage === "/" || curpage === "admin") && hash==="")
    {
        //$("mainmenu ul > li:first-child").addClass("active");
    }
    else
    {
        $(".mainmenu li").each(function()
                               {
            $(this).removeClass("active");
        });
        if(hash != "")
            $(".mainmenu li a[href*='"+hash+"']").parents("li").addClass("active");
        else
            $(".mainmenu li a[href*='"+curpage+"']").parents("li").addClass("active");
    }


/*******************
04. SmoothSroll
********************/
    $('.smooth, .smooth-scroll a').on('click', function (event) {
        var $anchor =$(this);
        var div = $('body div');
        if (div.has('#sticker')) {
            var headerH ='25';
        } else {
            var headerH = '-41';
        }
        $('html, body').stop().animate({
            'scrollTop': $($anchor.attr('href')).offset().top - headerH + "px"
        }, 1200, 'easeInOutExpo');
        event.preventDefault();
    });

/*******************
05. Scrollspy
********************/
    $('body').scrollspy({ target: '.navbar-collapse',offset: 95 });

/*******************
06. Category menu
********************/

    $('.catagory-heading').click(function(){
        $('.catagory-list-menu').slideToggle();
    });
    
    $('.sort-catagory-title').click(function(){
        $('.catagary-element').slideToggle();
    });
    
    $('.more-catagory').click(function(){
        $(this).hide();
        $('.more-catagory-item , .less-catagory ').slideDown();
    });
    
    $('.less-catagory').click(function(){
        $('.more-catagory-item').slideUp();
        $('.more-catagory').show();
        $(this).hide();
    });

/*******************
07. DateCount
********************/

    $(".DateCountdown").TimeCircles({
        "animation": "ticks",
        "bg_width": 0.3,
        "fg_width": 0.013333333333333334,
        "circle_bg_color": "#60686F",
        "time": {
            "Days": {
                "text": "Days",
                "color": "#F9ba48",
                "show": true
            },
            "Hours": {
                "text": "Hours",
                "color": "#F9ba48",
                "show": true
            },
            "Minutes": {
                "text": "Mins",
                "color": "#F9ba48",
                "show": true
            },
            "Seconds": {
                "text": "Secs",
                "color": "#F9ba48",
                "show": true
            }
        }
    });

/*******************
08. Deals Items
********************/

    $(".deals-day-items, .hot-deals-item").owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        autoplay: false,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        mouseDrag: false,
        touchDrag: false,
    });

/*******************
09. New arrival Item style 2
********************/

    $(".new-arrival-items.style-2").owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        autoplay: false,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        mouseDrag: false,
        touchDrag: false,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items : 1,
            },
            // breakpoint from 768 up
            768 : {
                items : 1,
            },
            // breakpoint from 768 up
            1024 : {
                items : 1,
            }
        }
    });

/*******************
10. New arrival Items
********************/

    $(".new-arrival-items").owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        autoplay: false,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        mouseDrag: false,
        touchDrag: false,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items : 1,
            },
            // breakpoint from 768 up
            768 : {
                items : 2,
            },
            // breakpoint from 768 up
            992 : {
                items : 1,
            },
            1024 : {
                items : 1,
            }
        }
    });

/*******************
11. Multiple Items (Random Products)
********************/

    $(".multiple-items.random-products").owlCarousel({
        items: 4,
        nav: true,
        dots: false,
        autoplay: false,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        mouseDrag: false,
        touchDrag: false,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items : 1,
            },
            // breakpoint from 480 up
            480 : {
                items : 2,
            },
            // breakpoint from 768 up
            768 : {
                items : 2,
            },
            // breakpoint from 768 up
            1024 : {
                items : 3,
            },
            // breakpoint from 768 up
            1200 : {
                items : 4,
            }
        }

    });

/*******************
12. Multiple Items
********************/

    $(".multiple-items").owlCarousel({
        items: 4,
        nav: true,
        dots: false,
        autoplay: false,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        mouseDrag: false,
        touchDrag: false,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items : 1,
            },
            // breakpoint from 480 up
            480 : {
                items : 2,
            },
            // breakpoint from 768 up
            768 : {
                items : 3,
            },
            // breakpoint from 768 up
            1024 : {
                items : 4,
            }
        }

    });

/*******************
13. Box Items
********************/

    $(".box-items").owlCarousel({
        items: 3,
        nav: true,
        dots: false,
        autoplay: false,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        mouseDrag: false,
        touchDrag: false,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items : 1,
            },
            // breakpoint from 480 up
            480 : {
                items : 1,
            },
            // breakpoint from 768 up
            768 : {
                items : 2,
            },
            // breakpoint from 768 up
            1024 : {
                items : 3,
            }
        }

    });

/*******************
14. Different Items
********************/

    $(".different-items").owlCarousel({
        items: 3,
        nav: true,
        dots: false,
        autoplay: false,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        mouseDrag: false,
        touchDrag: false,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items : 1,
            },
            // breakpoint from 480 up
            480 : {
                items : 2,
            },
            // breakpoint from 768 up
            768 : {
                items : 2,
            },
            // breakpoint from 768 up
            1024 : {
                items : 3,
            }
        }

    });

/*******************
15. Blog Slider
********************/

    $(".blog-posts-slider").owlCarousel({
        items: 2,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: false,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        mouseDrag: false,
        touchDrag: false,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items : 1,
            },
            // breakpoint from 480 up
            480 : {
                items : 1,
            },
            // breakpoint from 768 up
            768 : {
                items : 1,
            },
            // breakpoint from 768 up
            1024 : {
                items : 2,
            }
        }
    });

/*******************
16. Clients Logo
********************/

    $(".clients-logo").owlCarousel({
        items: 2,
        nav: true,
        dots: false,
        autoplay: false,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        mouseDrag: false,
        touchDrag: false,
    });

/*******************
17. Bos Items 2
********************/

    $(".box-items-2").owlCarousel({
        items: 2,
        nav: true,
        dots: false,
        autoplay: false,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        mouseDrag: false,
        touchDrag: false,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items : 1,
            },
            // breakpoint from 768 up
            1024 : {
                items : 2,
            }
        }
    });

/*******************
18. Price Slider
********************/

    $( "#slider-range" ).slider({
    range: true,
    min: 15,
    max: 30,
    values: [ 15, 30 ],
    slide: function( event, ui ) {
    $( "#amount" ).val( "$" + ui.values[ 0 ] + " -- $" + ui.values[ 1 ] );
    }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " -- $" + $( "#slider-range" ).slider( "values", 1 ) );


/*******************
19. Cart Plus Minus
********************/

    $(".cart-plus-minus").append('<div class="dec qtybutton">-</div><div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() == "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find("input").val(newVal);
    });

/*******************
20. ScrollUp
********************/

    //Check to see if the window is top if not then display button
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 700) {
            $('#scrollUp').fadeIn().parent('ul').addClass('scroll-visible');
        } else {
            $('#scrollUp').fadeOut().parent('ul').removeClass('scroll-visible');
        }
    });

    //Click event to scroll to top
    $('#scrollUp').on("click", function() {
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

})(jQuery);
