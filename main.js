
// Импортируем jQuery
//= scripts/jquery-2.1.1.js

// Импортируем Popper
//= scripts/popper.js

//= components/functions.js
//= components/flying-nav.js
//= components/contacts-nav.js
//= components/counter.js
//= scripts/lightslider.js
//= scripts/jquery.nanoscroller.js

//= ./scripts/classie.js
//= ./scripts/snap.svg-min.js
//= ./scripts/svgLoader.js


//= components/map.js

var slider;
var pageCart;
var pageNav;

var pageLoader = new SVGLoader(document.getElementById('pageLoader'), {speedIn: 300, easingIn: mina.easeinout});
pageLoader.show();

$(document).ready(function () {

    $(document).on('click', 'a', function () {
        var that = $(this);
        if (that.attr('href') !== '#') {
            pageLoader.show();
            setTimeout(function () {
                pageLoader.hide();
            }, 2000);
        }
        //return false;
    });


    pageCart = $('#page-cart').pageCart({
        trigger: $('#trigger-cart')
    });

});

$(window).load(function () {
    slider = $('.page-slider__list').lightSlider({
        auto: true,
        loop: true,
        item: 1,
        slideMove: 1,
        slideMargin: 0,
        easing: 'cubic-bezier(0.5, 0, 0.25, 1)',
        speed: 1000,
        pause: 9000,
        onSliderLoad: function () {
            $('.page-slider__list').removeClass('cS-hidden');
        }
    });


    setTimeout(function () {
        dishSlider = $('.page-cards__content__dish__preview .list').lightSlider({
            auto: false,
            loop: true,
            item: 1,
            slideMove: 1,
            slideMargin: 0,
            easing: 'cubic-bezier(0.5, 0, 0.25, 1)',
            speed: 1000,
            onSliderLoad: function () {
                $('.page-cards__content__dish__preview .list').removeClass('cS-hidden');
            }
        });

        dishMoreSlideset = $('.page-cards__content__dish__info .more__list').lightSlider({
            auto: false,
            loop: true,
            item: 3,
            slideMove: 3,
            slideMargin: 15,
            easing: 'cubic-bezier(0.5, 0, 0.25, 1)',
            speed: 1000,
            responsive : [
                {
                    breakpoint: 1640,
                    settings: {
                        item:2
                    }
                },
                {
                    breakpoint:480,
                    settings: {
                        item:1
                    }
                }
            ],
            onSliderLoad: function () {
                $('.page-cards__content__dish__info .more__list').removeClass('cS-hidden');
            }
        });
    }, 600);

    pageNav = $('#page-nav').pageNav({
        onAfterToggle: function () {
            if (typeof slider !== 'undefined' && slider.length > 0) {
                slider.refresh();

                if (pageNav.hasClass('on-show')) {
                    $(".nano").nanoScroller();
                } else {
                    $(".nano").nanoScroller({destroy: true});
                }
            }
        }
    });

    contactsNav = $('.contact-menu').contactsNav({
        // onAfterToggle: function () {
        //         if (pageNav.hasClass('on-show')) {
        //             $(".nano").nanoScroller();
        //         } else {
        //             $(".nano").nanoScroller({destroy: true});
        //         }
        // }
    });

    onDescktop(function () {
        //Show Left Menu
        pageNav.show();
    });

    $('.counter').cartCounter({
        onAfterUpdate: function (value, $obj) {
            console.log('onAfterUpdate', value, $obj.data('productid'));
        }
    });

    $('.page-cards__filter__title').on('click', function () {
       $(this).parent().toggleClass('collapsed');
    });

    $('.page-cards__content .card a:not(.counter__btn)').on('click', function () {
        $('.page-cards__content .card.active').removeClass('active');
        $(this).parents('.card').addClass('active');

        var $dish = $('.page-cards__content__dish');
        $dish.show();
        return false;
    });

    $('.page-cards__content__dish .header__close, .page-cards__content__dish .close').on('click', function () {
        $('.page-cards__content .card.active').removeClass('active');
        $('.page-cards__content__dish').hide();
    });

    // Hide Page Loader
    setTimeout(function () {
        $(document.body).removeClass('preloader');
        pageLoader.hide();
    }, 1000);
});

