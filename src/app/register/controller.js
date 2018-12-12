app.controller('RegisterCtrl', ['$http','$scope','ionicToast','locals','$state',function($http, $scope,ionicToast,locals,$state) {

    $scope.carListData=[];
    $scope.searchName="";
    var user = locals.getObject("user");
    var cardDataList =  locals.getObject("cardDataList");
    $scope.searchData=function(searchName){
        locals.setObject("selectCarInfo",null);


        var hasCarListData = new Array();
        if(cardDataList!=null && cardDataList.length!=null && cardDataList.length>0){
            for(var i=0;i<cardDataList.length;i++){
                var car=cardDataList[i];
                if(car!=null&&(car.mobile&& (car.mobile+"").indexOf(searchName)!=-1||car.vipnumber && (car.vipnumber+"").indexOf(searchName)!=-1||
                    car.cz && (car.cz+"").indexOf(searchName)!=-1||car.mc&&(car.mc+"").indexOf(searchName)!=-1)){
                    hasCarListData.push(car);
                }
            }
        }
        if(hasCarListData!=null && hasCarListData.length!=null && hasCarListData.length>0){
            $scope.carListData=hasCarListData;
        }else{
        var params= {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_plate_number_other",
            company_code: user.company_code,
            parameter: searchName
        }
        var jsonStr = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr,
        }).success(function (data, status, headers, config) {
            console.log(data);
            var state = data.state;
            if (state == 'ok') {
                var carListData=data.data;
                $scope.carListData=carListData;
                var newCardDataList =  locals.getObject("cardDataList");
                newCardDataList.push(carListData);
                locals.setObject("cardDataList",newCardDataList);
            } else {
                ionicToast.show(data.msg ? data.msg : "服务异常", 'middle',false, 2000);
            }
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
        }
    }

    $scope.goBackPage=function(){
        history.back()
       // $ionicHistory.goBack();
    }
    $scope.toHomePage=function(item){

        locals.setObject("selectCarInfo",item);
        $state.go("home");

    }

}]);