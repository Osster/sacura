$.fn.contactsNav = function (options) {
    var that = $(this);
    var currentListId;

    // if (that.length != 0) {
    //     console.log('pageNav', that);
    // }


    var switchList = function (id) {
        that.addClass('on-show');
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
        var $close = that.find('.close');
        switchList(listId);
        $btn.addClass('active');

        btns.on('click', function () {
            var $btn = $(this);
            var listId = $btn.data('id');
            switchList(listId);
            $btn.parent().find('.active').removeClass('active');
            $btn.addClass('active');
            return false;
        });

        $close.off('click').on('click', function () {
            var btns = that.find('.switcher a');
            btns.removeClass('active');
            that.removeClass('on-show');
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