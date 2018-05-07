$.fn.cartCounter = function (options) {
    var that = $(this);

    if (that.length == 0) {
        return false;
    }

    var init = function () {
        that.each(function (counter_key) {
            var $counter = $(that[counter_key]);

            var btnMinus = $counter.find('.minus');
            var btnPlus = $counter.find('.plus');
            var input = $counter.find('input');

            if (btnMinus.length == 1 && btnPlus.length == 1 && input.length == 1) {
                btnMinus.on('click', function () {
                    var value = parseInt(input.val());
                    if (value > 0) {
                        input.val(value-1);
                        if (typeof options != 'undefined' && typeof options.onAfterUpdate === 'function') {
                            options.onAfterUpdate(parseInt(input.val()), $counter);
                        }
                    }
                    return false;
                });
                btnPlus.on('click', function () {
                    var value = parseInt(input.val());
                    input.val(value+1);
                    if (typeof options != 'undefined' && typeof options.onAfterUpdate === 'function') {
                        options.onAfterUpdate(parseInt(input.val()), $counter);
                    }
                    return false;
                });
            }
        });

    };

    init();

    return that;
};