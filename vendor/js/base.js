/**
 * Created by lip on 2017/12/16.
 */
var wW = window.innerWidth;// ��ǰ���ڵĿ��
var whdef = 100/1080;// ��ʾ1080�����ͼ,ʹ��100PX��Ĭ��ֵ
var rem = wW * whdef;// ��Ĭ�ϱ���ֵ���Ե�ǰ���ڿ��,�õ��ÿ���µ���ӦFONT-SIZEֵ
$('html').css('font-size', rem + "px");
console.log(rem);

$(window).resize(function ()// �󶨵����ڵ�����¼���
{
    var wW = window.innerWidth;// ��ǰ���ڵĿ��
    var whdef = 100/1080;// ��ʾ1080�����ͼ,ʹ��100PX��Ĭ��ֵ
    var rem = wW * whdef;// ��Ĭ�ϱ���ֵ���Ե�ǰ���ڿ��,�õ��ÿ���µ���ӦFONT-SIZEֵ
    $('html').css('font-size', rem + "px");
    console.log(rem);
});