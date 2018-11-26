app.controller('guzhangCtrl', ['$http', '$scope', '$state' , "locals", "ionicToast", "$modal",function ($http, $scope, $state,  locals, ionicToast,$modal) {
    var carInfo = locals.getObject("carInfo");
    $scope.carInfo = carInfo;
    var jsdId = locals.get("jsd_id");
    $scope.jsd_id = jsdId;


    $scope.getGuzhangHistory=function(){
        var params2 = {
            db:locals.get("Data_Source_name"),
            function:"sp_fun_get_fault_info",
            customer_id:carInfo.customer_id,
            days:"1901-01-01 0:00:00"
        }

        var jsonStr3 =  angular.toJson(params2);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data:jsonStr3
        }).success(function (data, status, headers, config) {
            console.log(data);
            var state = data.state;
            if (state == 'ok') {

                $scope.dzDataList=data.data;
            }else{
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);

            }
        });


    }
    $scope.getGuzhangHistory();



    $scope.getDateTime = function(){
        var now = new Date();
        var year = now.getFullYear();
        var month =(now.getMonth() + 1).toString();
        var day = (now.getDate()).toString();
        var hour = (now.getHours()).toString();
        var minute = (now.getMinutes()).toString();
        var second = (now.getSeconds()).toString();
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        if (hour.length == 1) {
            hour = "0" + hour;
        }
        if (minute.length == 1) {
            minute = "0" + minute;
        }
        if (second.length == 1) {
            second = "0" + second;
        }
        var dateTime = year + "-" + month + "-" + day +" "+ hour +":"+minute+":"+second;
        return dateTime;

    }
    var curTime = $scope.getDateTime();


    $scope.showFirstModel = function () {


        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'modalOne.html',
            controller: 'modalMCtrl',
            size: 'lg',
            resolve: {
                data: function () {//data作为modal的controller传入的参数
                    return carInfo;//用于传递数据
                }
            }
        });

        modalInstance.result.then(function (gzms) {


            var params = {
                db: locals.get("Data_Source_name"),
                function: "sp_fun_update_fault_info",
                customer_id: carInfo.customer_id,
                car_fault: gzms,
                days: carInfo.jc_date
            };
            var jsonStr5 = angular.toJson(params);
            $http({
                method: 'post',
                url: '/restful/pro',
                dataType: "json",
                data: jsonStr5
            }).success(function (data, status, headers, config) {
                var state = data.state;
                if (state == 'ok') {
                    $scope.getGuzhangHistory();
                } else {
                    ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
                }
            }).error(function (data) {
                ionicToast.show("服务异常", "middle", 2000);
            });


        });


    }
    $scope.showFirstModel();

    $scope.goBackPage=function(){
        window.history.back();
    }


}]);


//模态框对应的Controller
app.controller('modalMCtrl', function ($scope, $state, $modalInstance, locals, data) {

    $scope.curTime = data.jc_date;
    $scope.gzms = data.car_fault;
    //在这里处理要进行的操作
    $scope.ok = function () {
        var gzms = $scope.gzms;
        $modalInstance.close(gzms);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
});