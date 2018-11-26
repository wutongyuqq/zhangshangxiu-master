app.controller('CompanyResCtrl', ['$http', '$scope', '$state', 'ionicToast', 'locals', function ($http, $scope, $state, ionicToast, locals) {
    $scope.dataArray = new Array();
    var enterName = locals.get("enterName");
    $scope.chooseName = enterName;

    var pre_row_number='0';
    var user = locals.getObject("user");
    var dataAllList = new Array();
    $scope.queryDataList = function (chooseName) {

       if(pre_row_number=='end'){
           $scope.dataArray =  $scope.sortarr(dataAllList);
           return;
       }
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_repair_state",
            company_code: user.company_code,
            states: chooseName,
            pre_row_number:pre_row_number
        };
        var jsonStr = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == 'ok') {
                pre_row_number = data.pre_row_number;
                var dataList=data.data;
                if(dataList!=null&&dataList.length>0){
                    for(var i=0;i<dataList.length;i++){
                        dataAllList.push(dataList[i]);
                    }
                }

                $scope.queryDataList(chooseName);

            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常","middle",2000);
            pre_row_number='end';
        });


    }

    $scope.queryDataList(enterName);

    $scope.queryData = function (chooseName) {
        pre_row_number='0';
        dataAllList = new Array();
        $scope.queryDataList(chooseName);
    }
    $scope.goBackPage = function () {
        window.history.back();
    }

    $scope.toGongdanPage=function(item){
        locals.set("jsd_id",item.jsd_id);

       locals.set("ticheTime","");
       locals.set("gonglishu","");
        locals.set("guzhangDes","");


        var carInfo = new Object();
        carInfo.cp=item.cp;
        carInfo.cardName=item.cp;
        carInfo.states=item.states;
        carInfo.jc_date=item.jc_date;
        carInfo.cjhm=item.cjhm;
        carInfo.cx=item.cx;
        carInfo.jcr=item.jcr;
        locals.setObject("carInfo",carInfo);
        $state.go("Winbding");
    }

    $scope.searchCar=function(cardName){
        var newDataList=new Array();
        if(dataAllList!=null&&dataAllList.length>0){
            for(var i=0;i<dataAllList.length;i++){

                var dataBean = dataAllList[i];
                if(dataBean.cp.indexOf(cardName)!=-1){
                    newDataList.push(dataBean);
                }
            }
            $scope.dataArray = newDataList;
        }
    }

    $scope.compare = function (obj1, obj2) {//比较函数
        var objJcDataStr1 = obj1.jc_date.split('-').join('').split(':').join('').split(' ').join('');
        var objJcDataStr2 = obj2.jc_date.split('-').join('').split(':').join('').split(' ').join('');
        if (objJcDataStr1 < objJcDataStr2) {
            return -1;
        } else if (objJcDataStr1 > objJcDataStr2) {
            return 1;
        } else {
            return 0;
        }
    }
    $scope.orderBySx = false;
    $scope.changeByTime=function(orderBySx){
        $scope.orderBySx=!orderBySx;
        if(dataAllList!=null&&dataAllList.length>0){
            var newDataArr = $scope.sortarr(dataAllList);
            $scope.dataArray = newDataArr;
        }
    }
        $scope.sortarr = function(arr){
        for(i=0;i<arr.length-1;i++){
            for(j=0;j<arr.length-1-i;j++){
                var objJcDataStr1 = arr[j].jc_date.split('-').join('').split(':').join('').split(' ').join('');
                var objJcDataStr2 = arr[j+1].jc_date.split('-').join('').split(':').join('').split(' ').join('');
                var orderBy = $scope.orderBySx;
                if(orderBy){
                if(objJcDataStr1>objJcDataStr2){
                    var temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                }
                }else{
                    if(objJcDataStr1<objJcDataStr2){
                        var temp=arr[j];
                        arr[j]=arr[j+1];
                        arr[j+1]=temp;
                    }
                }
            }
        }
        return arr;
    }
    }]);



