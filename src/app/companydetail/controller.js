app.controller('CompanyDetailCtrl', ['$http','$scope','utils','userTemp','$anchorScroll',"$location","locals",function($http,$scope, utils,userTemp,$anchorScroll,$location,locals) {

    $scope.goBackPage=function(){
        history.back()
    }
    $scope.getImageCode=function() {
        /*var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_get_weixin_brcode_address",
            data_source:locals.get("Data_Source_name"),
        }*/

        var  params =  {db:"asa_to_sql",function:"sp_fun_get_wxgzh_account",company_code:"A"}

        var jsonStr = angular.toJson(params);
        //var jsonStr = {"db":"sjsoft_SQL","function":"sp_fun_get_weixin_brcode_address","Data_Source":"首佳软件SQL"}


        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr,
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == 'ok') {
               // $scope.imgCodeUrl = data.brcode_address;
                var dataItemList = data.data;
                if(dataItemList&&dataItemList.length>0){
                    var dataItem = dataItemList[0];
                    var strAppid = dataItem.Appid;
                    var strAppSecret = dataItem.AppSecret;
                    $scope.getWxImageCode(strAppid,strAppSecret);
                }
            } else {

            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });
    }

    $scope.getImageCode();
    $scope.getWxImageCode=function(strAppid,strAppSecret) {
        console.log(strAppid+"======"+strAppSecret)
       // var addressUrl = 'http://wxgzh.whsjsoft.com/wx/api/push?id='+strAppid+'&aSet='+strAppSecret+'&nonce=access_token';
       var usercode =  locals.getObject("user").company_code;
         window.printdata.getWxInfoFromServer(strAppid,strAppSecret,'access_token',usercode);
    }

}]);



