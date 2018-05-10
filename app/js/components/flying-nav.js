$.fn.pageNav = function (options) {
    var that = $(this);
    var dBody = $(document.body);
    var currentListId;

    // if (that.length != 0) {
    //     console.log('pageNav', that);
    // }

    that.show = function () {
        if (typeof options !== 'undefined' && typeof options.onBeforeToggle === 'function') {
            options.onBeforeToggle();
        }
        that.addClass('on-show');
        dBody.addClass('left-nav');
        setTimeout(function () {
            if (typeof options !== 'undefined' && typeof options.onAfterToggle === 'function') {
                options.onAfterToggle();
            }
        }, 400);
    };
    that.hide = function () {
        if (typeof options !== 'undefined' && typeof options.onBeforeToggle === 'function') {
            options.onBeforeToggle();
        }
        that.removeClass('on-show');
        dBody.removeClass('left-nav');
        setTimeout(function () {
            if (typeof options !== 'undefined' && typeof options.onAfterToggle === 'function') {
                options.onAfterToggle();
            }
        }, 400);
    };

    var switchList = function (id) {
        currentListId = id;
        var list = $('#' + id);
        if (list.length > 0) {
            console.log('list.offsetLeft', list.position());
            var container = list.parent();
            container.css('transform', 'translateX(-' + list.position().left + 'px)');
        }
    };

    var init = function () {
        var btns = that.find('.switcher a');

        var $btn = $(btns.get(0));
        var listId = $btn.data('id');
        switchList(listId);
        $btn.addClass('active');

        var $close = that.find('.close');
        $close.on('click', function () {
            that.hide();
        });

        var $show = that.find('.flying-nav__show');
        $show.on('click', function () {
            that.show();
        });

        btns.on('click', function () {
            var $btn = $(this);
            var listId = $btn.data('id');
            switchList(listId);
            $btn.parent().find('.active').removeClass('active');
            $btn.addClass('active');
            return false;
        });

        $(window).resize(function () {
            setTimeout(function () {
                switchList(currentListId);
            }, 100);
        });
    };

    init();

    return that;
};

$.fn.pageCart = function (options) {
    var that = $(this);
    var dBody = $(document.body);

    that.show = function () {
        that.addClass('on-show');
        dBody.addClass('right-nav');
    };
    that.hide = function () {
        that.removeClass('on-show');
        dBody.removeClass('right-nav');
    };

    var init = function () {

        var $close = that.find('.close');
        $close.on('click', function () {
            that.hide();
        });

        if (options.trigger.length > 0) {
            options.trigger.on('click', function () {
                if (that.hasClass('on-show')) {
                    that.hide();
                } else {
                    that.show();
                }
            });
        }
    };

    init();

    return that;
};