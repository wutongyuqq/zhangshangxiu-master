/**
 * Created by lip on 2017/12/16.
 */
/*
var wW = window.innerWidth;// 当前窗口的宽度
var whdef = 100/1080;// 表示1080的设计图,使用100PX的默认值
var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
$('html').css('font-size', rem + "px");
console.log(rem);

$(window).resize(function ()// 绑定到窗口的这个事件中
{
    var wW = window.innerWidth;// 当前窗口的宽度
    var whdef = 100/1080;// 表示1080的设计图,使用100PX的默认值
    var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
    $('html').css('font-size', rem + "px");
    console.log(rem);
});

*/



(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 1080) + 'px';
        };

    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

