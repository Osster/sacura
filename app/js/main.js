
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


//= ../../node_modules/jquery-mask-plugin/dist/jquery.mask.js
//= ../../node_modules/jquery-validation/dist/jquery.validate.js
//= ../../node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js


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
            }

            if (pageNav.hasClass('on-show')) {
                $(".nano").nanoScroller();
            } else {
                $(".nano").nanoScroller({destroy: true});
            }

            if(typeof yaMap !== 'undefined') {
                yaMap.container.fitToViewport(true);
            }
        }
    });

    contactsNav = $('.contact-menu').contactsNav({

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

    //  FORM
    $.support.placeholder = (function(){
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();

    // Hide labels by default if placeholders are supported
    if($.support.placeholder) {
        // $('.form-label').each(function(){
        //     $(this).addClass('js-hide-label');
        // });
        //
        // Code for adding/removing classes here
        // $('.form-group').find('input, textarea').on('keyup blur focus', function(e){
        //
        //     // Cache our selectors
        //     var $this = $(this),
        //         $parent = $this.parent().find("label");
        //
        //     switch(e.type) {
        //         case 'keyup': {
        //             $parent.toggleClass('js-hide-label', $this.val() == '');
        //         } break;
        //         case 'blur': {
        //             if( $this.val() == '' ) {
        //                 $parent.addClass('js-hide-label');
        //             } else {
        //                 $parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
        //             }
        //         } break;
        //         case 'focus': {
        //             if( $this.val() !== '' ) {
        //                 $parent.removeClass('js-unhighlight-label');
        //             }
        //         } break;
        //         default: break;
        //     }
        // });
    }

    (function () {
        var form = $('#contact-form');
        if (form.length === 0 ) {
            return false;
        }
        var frm = form.get(0);

        $(frm.phone).mask('+7(000)000-00-00', {placeholder: "+7(___)___-__-__"});

        $(frm).validate({
            lang: 'ru',
            errorClass: 'invalid-feedback',
            errorElement: "span",
            errorElementClass: 'is-invalid',
            rules: {
                name: {
                    required: true,
                    minlength: 3
                },
                phone: {
                    required: true,
                    minlength: 16
                },
                datetime: {
                    required: true
                },
                agreeClb: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста укажите ваше имя",
                    minlength: "Имя должно содержать более двух символов"
                },
                phone: {
                    required: "Укажите ваш телефонный номер",
                    minlength: "Номер телефона должен состоять из 16-ти символов"
                },
                datetime: {
                    required: "Выберите дату и время"
                },
                agreeClb: {
                    required: "Необходимо согласие"
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass(this.settings.errorElementClass).removeClass(errorClass);
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(this.settings.errorElementClass).removeClass(errorClass);
            },
            submitHandler: function (form) {
                window.rcfm = form;
                grecaptcha.execute(window.gRecaptchaItem);
                return false;
            }
        });
    })();

    $.datetimepicker.setLocale('ru');
    $('#datetime').datetimepicker({
        mask:true,
        format: 'd.m.Y H:i',
        minDate:0,
        minTime:'10:00',
        maxTime:'22:00',
        step:30
    });

});

