/*var width = $(window).width(), height = $(window).height();
alert('width : ' +width + 'height : ' + height);*/
"use strict";
$(document).ready(function() {
    var $window = $(window);
    //add id to main menu for mobile menu start
    var getBody = $("body");
    var bodyClass = getBody[0].className;
    $(".main-menu").attr('id', bodyClass);
    //add id to main menu for mobile menu end

    //loader start
    $('.theme-loader').fadeOut(1000);
    //loader end

    // card js start
    var emailbody = $(window).height();
    $('.user-body').css('min-height', emailbody);
    $(".card-header-right .icofont-close-circled").on('click', function() {
        var $this = $(this);
        $this.parents('.card').animate({
            'opacity': '0',
            '-webkit-transform': 'scale3d(.3, .3, .3)',
            'transform': 'scale3d(.3, .3, .3)'
        });

        setTimeout(function() {
            $this.parents('.card').remove();
        }, 800);
    });
 
    $(".card-header-right .icofont-rounded-down").on('click', function() {
        var $this = $(this);
        var port = $($this.parents('.card'));
        var card = $(port).children('.card-block').slideToggle();
        $(this).toggleClass("icon-up").fadeIn('slow');
    });
    $(".icofont-refresh").on('mouseenter mouseleave', function() {
        $(this).toggleClass("rotate-refresh").fadeIn('slow');
    });
    $("#more-details").on('click', function() {
        $(".more-details").slideToggle(500);
    });
    $(".mobile-options").on('click', function() {
        $(".navbar-container .nav-right").slideToggle('slow');
    });
    // card js end

    //Menu layout end

    /*chatbar js start*/
    /*chat box scroll*/
    var a = $(window).height() - 50;
 

    // search
    $("#search-friends").on("keyup", function() {
        var g = $(this).val().toLowerCase();
        $(".userlist-box .media-body .chat-header").each(function() {
            var s = $(this).text().toLowerCase();
            $(this).closest('.userlist-box')[s.indexOf(g) !== -1 ? 'show' : 'hide']();
        });
    });

    // open chat box
    $('.displayChatbox').on('click', function() {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        } else {
            var options = {
                direction: 'right'
            };
        }
        $('.showChat').toggle('slide', options, 500);
    });


    //open friend chat
    $('.userlist-box').on('click', function() {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        } else {
            var options = {
                direction: 'right'
            };
        }
        $('.showChat_inner').toggle('slide', options, 500);
    });
    //back to main chatbar
    $('.back_chatBox').on('click', function() {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        } else {
            var options = {
                direction: 'right'
            };
        }
        $('.showChat_inner').toggle('slide', options, 500);
        $('.showChat').css('display', 'block');
    });
    // /*chatbar js end*/

    //Language chage dropdown start
    i18next.use(window.i18nextXHRBackend).init({
        debug: !1,
        fallbackLng: !1,
        backend: {
            loadPath: "assets/locales/{{lng}}/{{ns}}.json"
        },
        returnObjects: !0
    },
    function(err, t) {
        jqueryI18next.init(i18next, $)
    }),
    $(".lng-dropdown a").on("click", function() {

        var $this = $(this),
        selected_lng = $this.data("lng");
        i18next.changeLanguage(selected_lng, function(err, t) {
            $(".main-menu").localize()
        }),
        $this.parent("li").siblings("li").children("a").removeClass("active"), $this.addClass("active"), $(".lng-dropdown a").removeClass("active");
        var drop_lng = $('.lng-dropdown a[data-lng="' + selected_lng + '"]').addClass("active");
        $(".lng-dropdown #dropdown-active-item").html(drop_lng.html())
    })
        //Language chage dropdown end
    });

 
// toggle full screen
function toggleFullScreen() {
    var a = $(window).height() - 10;

    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

//light box
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

 


