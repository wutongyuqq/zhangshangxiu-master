app.controller('tenderIndex', ['$http', '$scope', '$state' , "locals", "ionicToast", "$modal",function ($http, $scope, $state,  locals, ionicToast,$modal) {
    var carInfo = locals.getObject("carInfo");


    var projectPer = locals.getObject("10600");
    $scope.projectPer = projectPer;
    $scope.toProjectSelect = function () {
        if (projectPer.new != '1') {
            ionicToast.show('没有权限', 'middle', false, 2000);
        } else {
            $state.go("TenderDtail");
        }
    }
    $scope.toHistoryRecord = function () {

        $state.go("TendListDetailCtrl");
    }


    $scope.toWinbding = function () {
        $state.go("Winbding");
    }
    var customer_id="";
    var jsd_id = locals.get("jsd_id");
    var jc_date = "";
    $scope.jsd_id = jsd_id;
    var params = {
        db:locals.get("Data_Source_name"),
        function:"sp_fun_down_repair_list_main",
        jsd_id:jsd_id
    };
    var jsonStr3 =  angular.toJson(params);
    var gdData = new Object();
    $scope.gdData = gdData;
    $http({
        method: 'post',
        url: '/restful/pro',
        dataType: "json",
        data:jsonStr3
    }).success(function (data, status, headers, config) {
        console.log(data);
        var state = data.state;
        if (state == 'ok') {
            var gdDataList = data.data;
            if(gdDataList!=null&&gdDataList.length>0){
                carInfo = $scope.carInfo;
                gdData = gdDataList[0];
                var carToInfo = gdData;
                var jcDataStr = gdData.jc_date;
                if(jcDataStr.length>10){
                    jcDataStr = jcDataStr.substring(0,10);
                }
                jc_date = gdData.jc_date;
                customer_id = gdData.customer_id;
                carToInfo.cz = gdData.cz;
                carToInfo.car_fault = gdData.car_fault;
                carToInfo.cardName = gdData.cp;
                carToInfo.gls = gdData.jclc&&gdData.jclc!="undefined"?gdData.jclc:"";
                carToInfo.cjhm = gdData.cjhm;
                carToInfo.cx =gdData.cx;
                carToInfo.gzms = gdData.car_fault;//故障描述
                carToInfo.jsr =gdData.custom5;//介绍人,没有取到
                carToInfo.ywtx = gdData.memo;//备注
                carToInfo.ticheTime = (gdData.ywg_date&&gdData.ywg_date.length>9)?gdData.ywg_date.substring(0,10):"";//备注
                carToInfo.customer_id = customer_id;
                carToInfo.jc_date = jc_date;

                locals.setObject("carInfo",carToInfo);
                $scope.carInfo = carToInfo;
            }

        }
    });


    $scope.cancleJieche = function () {


        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'modal8.html',
            controller: 'modalFCtrl',
            size: 'lg',
            resolve: {
                data: function () {//data作为modal的controller传入的参数
                    return null;//用于传递数据
                }
            }
        });

        modalInstance.result.then(function (delData) {
            var jsd_id=locals.get("jsd_id");
            var params2 = {
                db:locals.get("Data_Source_name"),
                function:"sp_fun_delete_repair_list_main",
                jsd_id:jsd_id
            }

            var jsonStr3 =  angular.toJson(params2);

            $scope.gdData = gdData;
            $http({
                method: 'post',
                url: '/restful/pro',
                dataType: "json",
                data:jsonStr3
            }).success(function (data, status, headers, config) {
                console.log(data);
                var state = data.state;
                if (state == 'ok') {

                    locals.set("jsd_id","");
                    $state.go("home");
                }else{
                    ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);

                }
            });
        }, function () {

        });
    }
    $scope.goBackPage=function(){
        history.back()
    }
    $scope.toBjSelect = function () {
        ionicToast.show('没有权限', 'middle', false, 2000);
    }


    $scope.clickNum=0;
    $scope.updateCarInfo = function (isShowItem, num) {

        if (num == 1) {

            $scope.isShowGls = !isShowItem;
            $scope.updateCarForOne("jclc",$scope.carInfo.gls);
        } else if (num == 2) {
            $scope.updateCarForOne("cjhm",$scope.carInfo.cjhm);
            $scope.isShowCjh = !isShowItem;
        } else if (num == 3) {
            $scope.updateCarForOne("cx",$scope.carInfo.cx);
            $scope.isShowCx = !isShowItem;
        } else if (num == 4) {
            $scope.updateCarForOne("ywg_date",$scope.carInfo.ticheTime);
           // locals.set("ticheTime",$scope.carInfo.ticheTime);
        } else if (num == 5) {

            $scope.isShowGzms = !isShowItem;
        } else if (num == 6) {
            $scope.updateCarForOne("custom5",$scope.carInfo.jsr);
            $scope.isShowJsr = !isShowItem;
        } else if (num == 7) {
            $scope.updateCarForOne("memo",$scope.carInfo.ywtx);
            $scope.isShowBz = !isShowItem;
        }
        if (!isShowItem) {
            return;
        }
        if(num!=5){
            var totleNum =  $scope.clickNum+1;
            $scope.clickNum =  totleNum;
        }else{
           $state.go("guzhang");
        }

    }


    $scope.updateCarForOne = function (columnName, valueData) {
        var jsd_id = locals.get("jsd_id");
        $scope.jsd_id = jsd_id;
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_upload_repair_list_main_other",
            column_name: columnName,
            data: valueData,
            jsd_id: jsd_id
        };
        var jsonStr3 = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr3
        }).success(function (data, status, headers, config) {
            console.log(data);
            var state = data.state;
            if (state == 'ok') {

            }
        });
    }








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


}]);


//模态框对应的Controller
app.controller('modalFCtrl', function ($scope, $state, $modalInstance, locals, data) {
   var carInfo = locals.getObject("carInfo");
    $scope.cardName = carInfo.cardName;
    //在这里处理要进行的操作
    $scope.ok = function () {
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
});