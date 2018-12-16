app.controller('userCenterCtrl', ['$http', '$scope','ionicToast','locals','$state','ionicToast', function ($http, $scope,ionicToast,locals,$state,ionicToast) {
    $scope.showSelectMore = 0;
    var selectDate={
        startData:'2018-11-01',
        endData:'2018-11-30'
    };
    $scope.selectData = selectDate;
    var user = locals.getObject("user");
    $scope.userName = user.userName;
    $scope.getCardListData = function (selectDate) {
        var params = {
            db:'mycon1',
            function:"sp_fun_query_achievement",
            company_code:"A",
            employee:user.userName,
            dates: $scope.selectData.startData+" 00:00:00",
            datee: $scope.selectData.endData + " 23:59:59"
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
                $scope.dataArray = data.data[0];
            }else{
                ionicToast.show(data.msg, "middle", 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });
    }

    $scope.getCardListData(selectDate);
    $scope.getJieDaiData = function (mSelectDate) {
        if(mSelectDate){
            selectDate = mSelectDate;
        }
        var params = {
            db:'mycon1',
            function:"sp_fun_query_achievement_sale",
            company_code:"A",
            employee:user.userName,
            dates: $scope.selectData.startData+" 00:00:00",
            datee: $scope.selectData.endData + " 23:59:59"
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
                $scope.jieDaiData = data.data[0];
            }else{
                 ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle",false, 2000);
        });
    }

    $scope.getJieDaiData(selectDate);


    $scope.getShigongData = function (mSelectDate) {
        if(mSelectDate){
            selectDate = mSelectDate;
        }
        var params = {
            db:'mycon1',
            function:"sp_fun_query_achievement_repair",
            company_code:"A",
            employee:user.userName,
            dates: $scope.selectData.startData+" 00:00:00",
            datee: $scope.selectData.endData + " 23:59:59"
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
                $scope.shigongData = data.data[0];
            }else{
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", 'middle', false, 2000);
        });
    }


    $scope.getYejiFenzuData = function (mSelectDate) {
        if(mSelectDate){
            selectDate = mSelectDate;
        }

        var params = {
            db:'mycon1',
            function:"sp_fun_query_achievement_collect",
            company_code:"A",
            employee:user.userName,
            dates: $scope.selectData.startData+" 00:00:00",
            datee: $scope.selectData.endData + " 23:59:59"
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
                $scope.yejiDataArray = data.data;
            }else{
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });
    }
    $scope.getYejiFenzuData(selectDate);

    $scope.getShigongFenzuData = function (mSelectDate) {
        if(mSelectDate){
            selectDate = mSelectDate;
        }
        var params = {
            db:'mycon1',
            function:"sp_fun_query_achievement_collect_repair",
            company_code:"A",
            employee:user.userName,
            dates: $scope.selectData.startData+" 00:00:00",
            datee: $scope.selectData.endData + " 23:59:59"
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
                $scope.shigongDataArray = data.data;
            }else{
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });
    }

    $scope.getShigongFenzuData(selectDate);

    $scope.showMoreView=function(showSelectMore){
        $scope.showSelectMore = showSelectMore;
        if(showSelectMore==0){
            $scope.getJieDaiData(selectDate);
        }else if(showSelectMore==1){
            $scope.getShigongData(selectDate);
        }
    }

    $scope.getDataList = function(searchSelectDate){
        $scope.getJieDaiData(searchSelectDate);
        $scope.getShigongData(searchSelectDate);
        $scope.getCardListData(searchSelectDate);
        $scope.getYejiFenzuData(searchSelectDate);
    }

    $scope.toDetailPage=function(name,type){
        var mStartDate = $scope.selectData.startData;
        var mEndDate = $scope.selectData.endData;

        $state.go("centerDetail",{startDate:mStartDate,endDate:mEndDate,mType:type,name:name});
    }
}]);
app.controller('msgInfoCenterCtrl','ionicToast', ['$http', '$scope', function ($http, $scope,ionicToast) {

    $scope.showSelectMore = 0;
    var mSelectDate={
        startData:'2017-01-01',
        endData:'2018-11-30'
    };
    $scope.getCardListData = function () {

        var params = {
            db: "mycon1",
            function: "sp_fun_query_repair_history",
            company_code:"A",
            dates: mSelectDate.startData+" 00:00:00",
            datee: mSelectDate.endData + " 23:59:59"
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
                }else{
                    ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
                }
            }).error(function (data) {
                ionicToast.show("服务异常", "middle", 2000);
            });
    }


    $scope.getCardListData();

}]);


app.controller('centerCtrl', ['$http', '$scope', '$state',function ($http, $scope,$state) {

    $scope.showSelectMore = 0;

    $scope.toPage = function (selectItem){
        if(selectItem=='1'){
            $state.go("mycenter");

        }else if(selectItem=='2'){

        }else if(selectItem=='3'){

        }else if(selectItem=='4'){

        }else if(selectItem=='5'){
            $state.go("msgInfoCenter");
        }else if(selectItem=='6'){
            $state.go("msgInfoCenter");
        }

    }

}]);



app.controller('centerDetailCtrl', ['$http', '$scope', '$state','locals','$stateParams','ionicToast',function ($http, $scope,$state,locals,$stateParams,ionicToast) {

    var mStartDate = $stateParams.startDate;
    var mEndDate = $stateParams.endDate;
    var type = parseInt($stateParams.mType);
    var name = $stateParams.name;

    $scope.showSelectMore = 0;

    var user = locals.getObject("user");
    var functionName = type==1?"sp_fun_query_achievement_detail":"sp_fun_query_achievement_detail_repair";
    $scope.getDetailData = function (selectData) {

        var params = {
            db: "mycon1",
            function: functionName,
            company_code:"A",
            employee:user.userName,
            dates: mStartDate+" 00:00:00",
            datee:mEndDate + " 23:59:59",
            xlxm:name
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
                $scope.dataBean = data.data;

            }else{
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", 'middle', false, 2000);
        });
    }
    $scope.getDetailData();

    $scope.goBackHistory=function(){
            history.back();
    }
}]);
