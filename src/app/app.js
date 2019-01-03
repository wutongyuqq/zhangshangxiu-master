/*
* 1、浏览器中输入地址
* 2、路由拦截输入的地址（锚点后的字符串）
* 3、每个state会去匹配该字符串 如果匹配则进入templateUrl的地址所指示的html页面
* 4、如果都没有匹配的，则进入最后一行otherwise的地址
*
* */
var app = angular.module('WEBAPP', [
    'ui.router',
    'ui.bootstrap',
    'ngTouch',
    'oc.lazyLoad',
    'app.utils',
    'infinite-scroll',
    'ionic',
    'ionic-toast'
]);

app.factory('locals',['$window',function($window){
    return {
        set:function(key,value){
            $window.localStorage[key]=value;
        },
        get:function(key,defaultValue){
            return  $window.localStorage[key] || defaultValue;
        },
        setObject:function(key,value){
            $window.localStorage[key]=JSON.stringify(value);
        },
        getObject:function(key){
            if($window.localStorage[key]&&$window.localStorage[key]!="undefined") {
                return JSON.parse($window.localStorage[key] || '{}');
            }else{
                return "";
            }
        }
    }
}]);

app.directive('ngEnter', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function ($scope, element, attrs, controller) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    $scope.$apply(function (){
                        $scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        }}});

app.filter('areaLimit',function () {
    return function (name) {
        if('黑龙江省'==name){
            return '黑龙江';
        }else{
            return name.substring(0,2);
        }
    }
});


app.filter('limitNum',function () {
    return function (name) {
        var nameStr = name?name+"":"";
        if(!nameStr||nameStr.indexOf(".")==-1){
            return nameStr;
        }else{
            nameStr = nameStr + "000";
            return nameStr.substring(0,nameStr.indexOf('.')+3);
        }
    }
});

app.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];
        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
});


function getDataFromAjax(url,paramJson,callback) {
    $.ajax({
        type:"post",
        url:url,
        data:paramJson,
        success:function(data){
            console.log(data);
            if(callback){
                callback(JSON.parse(data));
            }
        }
    });
}

