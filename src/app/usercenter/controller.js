app.controller('userCenterCtrl', ['$http', '$scope', 'ionicToast', 'locals', '$state', 'ionicToast', function ($http, $scope, ionicToast, locals, $state, ionicToast) {
    $scope.showSelectMore = 0;
    var selectDate = {
        startData: '2018-11-01',
        endData: '2018-11-30'
    };
    /**
     * 获取当前月的第一天
     */
    $scope.getCurrentMonthFirst=function(){
        var myDate = new Date();//获取系统当前时间
        var month = myDate.getMonth()+1;
        var monthStr = month+"";
        if(month<10){
            monthStr = "0"+month;
        }
        return myDate.getFullYear()+"-"+monthStr+"-01"
    }
    /**
     * 获取当前月的最后一天
     */
    $scope.getCurrentMonthLast=function(){
        var myDate = new Date();//获取系统当前时间
        var month = myDate.getMonth()+1;
        var monthStr = month+"";
        if(month<10){
            monthStr = "0"+month;
        }
        var date = myDate.getDate();
        var dateStr = date+"";
        if(date<10){
            dateStr = "0"+date;
        }
        return  myDate.getFullYear()+"-"+monthStr+"-"+dateStr;
    }

    $scope.goBackHistory=function(){
        history.go(-1);
    }
    var user = locals.getObject("user");
    $scope.userName = user.userName;
    $scope.getCardListData = function (selectDate) {
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_query_achievement",
            company_code: locals.getObject("user").company_code,
            employee: user.userName,
            dates: $scope.selectData.startData + " 00:00:00",
            datee: $scope.selectData.endData + " 23:59:59"
        };
        var json = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: json,
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == "ok") {
                $scope.dataArray = data.data[0];
            } else {
                ionicToast.show(data.msg, "middle", 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });
    }


    $scope.getJieDaiData = function (mSelectDate) {
        if (mSelectDate) {
            selectDate = mSelectDate;
        }
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_query_achievement_sale",
            company_code: locals.getObject("user").company_code,
            employee: user.userName,
            dates: $scope.selectData.startData + " 00:00:00",
            datee: $scope.selectData.endData + " 23:59:59"
        };
        var json = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: json,
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == "ok") {
                $scope.jieDaiData = data.data[0];
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", false, 2000);
        });
    }




    $scope.getShigongData = function (mSelectDate) {
        if (mSelectDate) {
            selectDate = mSelectDate;
        }
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_query_achievement_repair",
            company_code: locals.getObject("user").company_code,
            employee: user.userName,
            dates: $scope.selectData.startData + " 00:00:00",
            datee: $scope.selectData.endData + " 23:59:59"
        };
        var json = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: json,
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == "ok") {
                $scope.shigongData = data.data[0];
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", 'middle', false, 2000);
        });
    }


    $scope.getYejiFenzuData = function (mSelectDate) {
        if (mSelectDate) {
            selectDate = mSelectDate;
        }

        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_query_achievement_collect",
            company_code: locals.getObject("user").company_code,
            employee: user.userName,
            dates: $scope.selectData.startData + " 00:00:00",
            datee: $scope.selectData.endData + " 23:59:59"
        };
        var json = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: json,
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == "ok") {
                $scope.yejiDataArray = data.data;
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });
    }


    $scope.getShigongFenzuData = function (mSelectDate) {
        if (mSelectDate) {
            selectDate = mSelectDate;
        }
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_query_achievement_collect_repair",
            company_code: locals.getObject("user").company_code,
            employee: user.userName,
            dates: $scope.selectData.startData + " 00:00:00",
            datee: $scope.selectData.endData + " 23:59:59"
        };
        var json = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: json,
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == "ok") {
                $scope.shigongDataArray = data.data;
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });
    }



    $scope.showMoreView = function (showSelectMore) {
        $scope.showSelectMore = showSelectMore;
        if (showSelectMore == 0) {
            $scope.getJieDaiData(selectDate);
        } else if (showSelectMore == 1) {
            $scope.getShigongData(selectDate);
        }
    }

    $scope.getDataList = function (searchSelectDate) {
        $scope.getJieDaiData(searchSelectDate);
        $scope.getShigongData(searchSelectDate);
        $scope.getCardListData(searchSelectDate);
        $scope.getYejiFenzuData(searchSelectDate);
        $scope.getShigongFenzuData(selectDate);
    }


    selectDate.startData = $scope.getCurrentMonthFirst();
    selectDate.endData = $scope.getCurrentMonthLast();
    $scope.selectData = selectDate;

    $scope.toDetailPage = function (name, type) {
        var mStartDate = $scope.selectData.startData;
        var mEndDate = $scope.selectData.endData;

        $state.go("centerDetail", {startDate: mStartDate, endDate: mEndDate, mType: type, name: name});
    }






    $scope.$on('$ionicView.enter',function(){
        console.log("enter");
    });

    $scope.$on('$ionicView.loaded',function(){
        console.log("loaded");
    });

    $scope.$on('$ionicView.leave',function(){
        console.log("leave");
    });

    $scope.$on('$ionicView.beforeEnter',function(){
        console.log("beforeEnter");
    });

    $scope.$on('$ionicView.beforeLeave',function(){
        console.log("beforeLeave");
    });

    $scope.$on('$ionicView.afterEnter',function(){
        console.log("afterEnter");
    });

    $scope.$on('$ionicView.afterLeave',function(){
        console.log("afterLeave");
    });

    $scope.$on('$ionicView.unloaded',function(){
        console.log("unloaded");
    });

}]);
app.controller('msgInfoCenterCtrl', ['$http', '$scope', 'ionicToast', 'locals','$state',function ($http, $scope, ionicToast,locals,$state) {

    $scope.showSelectMore = 0;
    var mSelectDate = {
        startData: '2017-01-01',
        endData: '2018-11-30'
    };

    $scope.getCardListData = function () {

        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_query_repair_history",
            company_code: locals.getObject("user").company_code,
            dates: $scope.selectData.startData + " 00:00:00",
            datee: $scope.selectData.endData + " 23:59:59"
        };
        var json = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: json,
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == "ok") {
                $scope.dataArray = data.data;
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });
    }


    $scope.goBackHistory=function(){
        history.go(-1);
    }

    $scope.goTenderDetail=function(jsd_id){
        locals.set("jsd_id",jsd_id);
        $state.go("Tender");

    }


    /**
     * 获取当前月的第一天
     */
    $scope.getCurrentMonthFirst=function(){
        var myDate = new Date();//获取系统当前时间
        var month = myDate.getMonth()+1;
        var monthStr = month+"";
        if(month<10){
            monthStr = "0"+month;
        }
        return myDate.getFullYear()+"-"+monthStr+"-01"
    }
    /**
     * 获取当前月的最后一天
     */
    $scope.getCurrentMonthLast=function(){
        var myDate = new Date();//获取系统当前时间
        var month = myDate.getMonth()+1;
        var monthStr = month+"";
        if(month<10){
            monthStr = "0"+month;
        }
        var date = myDate.getDate();
        var dateStr = date+"";
        if(date<10){
            dateStr = "0"+date;
        }
        return  myDate.getFullYear()+"-"+monthStr+"-"+dateStr;
    }

    mSelectDate.startData = $scope.getCurrentMonthFirst();
    mSelectDate.endData = $scope.getCurrentMonthLast();
    $scope.selectData = mSelectDate;
    $scope.getCardListData();

}]);


app.controller('centerCtrl', ['$http', '$scope', '$state', function ($http, $scope, $state) {

    $scope.showSelectMore = 0;

    $scope.toPage = function (selectItem) {
        if (selectItem == '1') {
            $state.go("mycenter");

        } else if (selectItem == '2') {
            $state.go("baoyang");
        } else if (selectItem == '3') {
            $state.go("btnCenter");
        } else if (selectItem == '4') {
            $state.go("sinCenter");
        } else if (selectItem == '5') {
            $state.go("msgInfoCenter");
        } else if (selectItem == '6') {
            $state.go("tipCenter");
        }

    }

}]);


app.controller('centerDetailCtrl', ['$http', '$scope', '$state', 'locals', '$stateParams', 'ionicToast', function ($http, $scope, $state, locals, $stateParams, ionicToast) {

    var mStartDate = $stateParams.startDate;
    var mEndDate = $stateParams.endDate;
    var type = parseInt($stateParams.mType);
    var name = $stateParams.name;

    $scope.showSelectMore = 0;

    var user = locals.getObject("user");
    var functionName = type == 1 ? "sp_fun_query_achievement_detail" : "sp_fun_query_achievement_detail_repair";
    $scope.getDetailData = function (selectData) {

        var params = {
            db: locals.get("Data_Source_name"), //db: "mycon1",
            function: functionName,
            company_code: locals.getObject("user").company_code,
            employee: user.userName,
            dates: mStartDate + " 00:00:00",
            datee: mEndDate + " 23:59:59",
            xlxm: name
        };

        var json = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: json,
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == "ok") {
                $scope.dataArray = data.data;
                $scope.dataBean = data.data;

            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", 'middle', false, 2000);
        });
    }
    $scope.getDetailData();

    $scope.goBackHistory=function(){
        history.go(-1);
    }
}]);
