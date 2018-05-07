var onDescktop = function (cb) {
    var wnd = parseInt($(window).width());
    console.log('wnd', wnd);
    if (wnd > 1024 && typeof cb === 'function') {
        cb();
    }
};