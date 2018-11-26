app.controller('CompanyTopCtrl', ['$http','$scope','locals','ionicToast','$state',function($http, $scope,locals,ionicToast,$state) {
    var user = locals.getObject("user");

    var params ={
        db:locals.get("Data_Source_name"),
        function:"sp_fun_get_general_situation",
        company_code:user.company_code
    };
    var jsonStr = angular.toJson(params);
    $scope.zcData = new Object();
    $http({
        method: 'post',
        url: '/restful/pro',
        dataType: "json",
        data: jsonStr
    }).success(function (data, status, headers, config) {
        var state = data.state;
        if (state == 'ok') {
            var dataArray = data.data;
            if(dataArray!=null && dataArray.length>0){
                $scope.zcData = dataArray[0];
            }

        } else {
            ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
        }
    }).error(function (data) {
        ionicToast.show("服务异常","middle",2000);
    });

    $scope.toFactoryDetail=function(enterName){
        locals.set("enterName",enterName);
        $state.go("companyRes");
    }

}]);