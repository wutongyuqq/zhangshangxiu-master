app.controller('CompanyDetailCtrl', ['$http','$scope','utils','userTemp','$anchorScroll',"$location","locals",function($http,$scope, utils,userTemp,$anchorScroll,$location,locals) {

    $scope.goBackPage=function(){
        history.back()
    }
    $scope.getImageCode=function() {
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_get_weixin_brcode_address",
            data_source:locals.get("Data_Source_name"),
        }

         params = {db:"sjsoft_SQL",function:"sp_fun_get_weixin_brcode_address",data_source:"ASA转SQL"}

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
                $scope.imgCodeUrl = data.brcode_address;
            } else {

            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });
    }

    $scope.getImageCode();

}]);


