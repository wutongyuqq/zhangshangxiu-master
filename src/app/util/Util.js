/**
 * Created by Administrator on 2018/11/8 0008.
 */
function isIos(){
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios÷’∂À
    return isiOS;
}
if(!isIos()) {
    iosInput();
}else{
    $("#tab_nav").css("height","1.9rem");
    $("#text-card").css("font-size","0.8em");
    $("#tab_nav").css("padding-bottom","0.1rem");

}
