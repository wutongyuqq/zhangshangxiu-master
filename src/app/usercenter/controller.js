app.controller('userCenterCtrl', ['$http', '$scope', function ($http, $scope) {
    $scope.showSelectMore = 0;

}]);
app.controller('msgInfoCenterCtrl', ['$http', '$scope', function ($http, $scope) {

    $scope.showSelectMore = 0;
    $scope.getCardListData = function (selectDate) {
        var params = {
            db: "mycon1",
            function: "sp_fun_query_repair_history",
            dates: selectDate.startData+" 00:00:00",
            datee: selectDate.endData + " 23:59:59"
        };
        var json = angular.toJson(params);
            $http({
                method: 'post',
                url: '/restful/pro',
                dataType: "json",
                data:json,
            }).success(function (data, status, headers, config) {
                var state = data.state;
                if(state=="ok"){
                    $scope.dataArray = data.data;
                }
            }).error(function (data) {
                ionicToast.show("服务异常", "middle", 2000);
            });
    }
}]);
