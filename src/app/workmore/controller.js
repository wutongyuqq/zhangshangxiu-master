app.controller('WorkMoreCtrl', ['$http','$scope','$state','locals',"ionicToast","$ionicLoading",function($http, $scope,$state,locals,ionicToast,$ionicLoading) {

    $scope.exitLogin = function(){
        locals.setObject("pjKucun","");
        var user = locals.getObject("user");
        var params = {
            db:locals.get("Data_Source_name"),
            function:"sp_fun_user_logout",
            operater_code:user.userName,
            operater_ip:returnCitySN.cip
        };
        var jsonStr = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr,
        }).success(function (data, status, headers, config) {
            console.log(data);
            var state = data.state;
            var endDateStr = data.service_end_date;
            if (state == 'true') {

                locals.set("ticheTime","");
                locals.set("gonglishu","");
                locals.set("guzhangDes","");
                locals.setObject("selectCarInfo",null);
                locals.setObject("firstIconArr",null);
                locals.setObject("carInfo",null);
                locals.setObject("repairPersonList",null);

                locals.setObject("kjProList",null);
                locals.setObject("chgProList",null);

                locals.setObject("pjKucun", null);
                locals.setObject("newPjDataList", null);
                locals.setObject("shouyinCar",null);
                locals.setObject("shouyinBean", null);

                console.log(data.msg);
                locals.setObject("user","");
                $state.go("Login");

            }
        });
    }

    $scope.checkVersion=function(){
        window.printdata.checkVesion();

    }
    $scope.updateData=function(){


        $ionicLoading.show({
            template: 'Loading...'
        });


        var user = locals.getObject("user");
        var params1 = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_maintenance_category"
        }

        var jsonStr6 = angular.toJson(params1);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr6
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == "ok") {
                var firstIconArr = data.data;
                $scope.firstIconArr = firstIconArr;
                locals.setObject("firstIconArr", firstIconArr);
                ionicToast.show("更新车辆数据成功", "middle",false, 2000);
            }else{
                ionicToast.show("更新项目库数据失败："+data.msg, "middle",false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("更新项目库数据失败", "middle",false, 2000);
        });



        var params2 = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_repairman",
            company_code: user.company_code
        }
        var jsonStr2 = angular.toJson(params2);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr2,
        }).success(function (data) {
            var state = data.state;
            if (state == 'ok') {
                locals.setObject("repairPersonList", data.data);
                ionicToast.show("更新修理数据成功", "middle",false, 2000);
            } else {
                ionicToast.show("更新项目库数据失败："+data.msg, "middle",false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("更新项目库数据失败", "middle",false, 2000);
        });

        $scope.getIconData();

        var params3 = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_stock",
            comp_code: user.company_code,
            pjbm: "",
            cd: "",
            ck: ""
        }
        var jsonStr4 = angular.toJson(params3);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data:jsonStr4
        }).success(function (data, status, headers, config) {
            console.log("data   " + angular.toJson(data));

            var state = data.state;
            if (state == 'ok') {
                var pjKucun = data.data;
                locals.setObject("pjKucun", pjKucun);
                locals.setObject("newPjDataList", pjKucun);
                ionicToast.show("更新配件数据成功", "middle",false, 2000);
            } else {
                ionicToast.show("错误：更新配件库存失败 " + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("更新配件库存失败","middle",false,2000);
        });


    }





    var postFlag = "0";

    var kjProList = [];
    var chgProList = [];
    var baoyangList = [];
    $scope.getIconData = function () {
        if (postFlag == "end") {
            $ionicLoading.hide();
            locals.setObject("kjProList",kjProList);
            locals.setObject("chgProList",chgProList);
            locals.setObject("baoyangList",baoyangList);
            ionicToast.show("更新项目库数据成功", "middle",false, 2000);
            return;
        }
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_maintenance_project",
            previous_xh: postFlag
        };
        var jsonStr = angular.toJson(params);
        console.log("jsonStr:"+jsonStr);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr
        }).success(function (data, status, headers, config) {
            console.log(data);
            var state = data.state;
            postFlag = data.Previous_xh;
            if (state == 'ok' && postFlag != "end") {
                var dataList = data.data;
                for (var i = 0; i < dataList.length; i++) {
                    var item = dataList[i];
                    if (item.tybz == "0" && item.wxgz != null && item.wxgz != '') {
                        if (item.is_quick_project == "是") {
                            kjProList.push(item);
                        } else if (item.is_quick_project == "否") {
                            chgProList.push(item);
                        }

                    } else if (item.tybz == "2") {
                        baoyangList.push(item);
                    }
                }
            }
                $scope.getIconData();


        }).error(function (data) {
            $ionicLoading.hide();
            ionicToast.show("更新项目库失败","middle",false,2000);
        });
    }


}]);






app.controller('WorkMoreDetailCtrl', ['$http','$uibModal','$log','$scope','$state','$stateParams','userTemp',function($http,$uibModal, $log, $scope,$state,$stateParams,userTemp) {
    var selt = this;

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }

    var id = parseInt($stateParams.id);
    $http.post("/notice/queryArticleDetail",{id:id}).success(function (result) {
        console.log(result);
        $scope.dataRes = result.data;
        $("#bdd_adver_header_content").html(result.data.content);
    });
    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };

}]);