app.controller('HomeCtrl', ['$http', '$scope', "locals","$modal","$state","ionicToast",function ($http, $scope, locals,$modal,$state,ionicToast) {
    var selt = this;
    var postNum=0;
    var user = locals.getObject("user");
    if(user==null||user.userName==null|| locals.get("Data_Source_name")==null||locals.get("Data_Source_name")==""){
        $state.go("Login");
        return;
    }
    locals.set("ticheTime","");
    locals.set("gonglishu","");
    locals.set("guzhangDes","");

    var flagNumber = 0;
    $scope.showFootTab=true;
    var userName = user.userName;
    $scope.isIOSPhone =  false;
    $scope.showCardList = false;
    var carInfo = new Object();
    carInfo.company_code="";
    carInfo.plate_number="";
    carInfo.cz="";
    carInfo.mobile="";
    carInfo.phone="";
    carInfo.linkman="";
    carInfo.custom5="";
    carInfo.cx="";
    carInfo.cjhm="";
    carInfo.fdjhm="";
    carInfo.ns_date="";
    carInfo.oprater_code="";
    carInfo.cardName="";
    carInfo.gzms="";
    carInfo.ysph="";
    carInfo.ywtx="";
    carInfo.shortCardName = "";
    carInfo.openid = "";
    $scope.carInfo = carInfo;
    $scope.proName="闽";
    if(locals.getObject("selectCarInfo")!=null){
        var carInfo2 = locals.getObject("selectCarInfo");
        if(carInfo2.mc!=null){
       var proName2 = carInfo2.mc.substring(0,1);
        carInfo2.shortCardName = carInfo2.mc.substring(1,carInfo2.mc.length);
            carInfo2.mobile=Number(carInfo2.mobile);
        $scope.carInfo = carInfo2;
        $scope.proName=proName2;
        }
    }
    $scope.showMore = 0;
    $scope.showCard = false;
    $scope.showMoreView = function (showMore) {
        $scope.showMore = showMore;
    }
    $scope.showCardMore = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'modal9.html',
            controller: 'modalMCtrl',
            size: 'lg',
            resolve: {
                data: function () {//data作为modal的controller传入的参数
                    return null;//用于传递数据
                }
            }
        });

        modalInstance.result.then(function (resData) {
           $scope.proName = resData;
        }, function () {

        });
    }
    $scope.selectCard = function (proviceName) {
        $scope.proName = proviceName;
        $scope.showCard = false;

    }
    $scope.showOldCardList = function ($event) {
        console.log('222');
    }
    $scope.isIOS=function() {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        $scope.isIOSPhone = isiOS;
    }


//获取车牌列表
    var previous_xh = "0";
    var allCardDataList  = [];

    $scope.getCardListData = function(){
        if(previous_xh=="end"){
            $scope.cardDataList = allCardDataList;
            locals.setObject("cardDataList",allCardDataList);
            return;
        }
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_plate_number",
            company_code: user.company_code,
            previous_xh: previous_xh
        };
        if(user.company_code){
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: angular.toJson(params),
        }).success(function (data, status, headers, config) {
            var state = data.state;
            previous_xh = data.Previous_xh;
            if (state == 'ok') {
                allCardDataList = allCardDataList.concat(data.data);
            }
            $scope.getCardListData();
        }).error(function(data){
            ionicToast.show("服务异常","middle",2000);
        });
        }

    }
    var cardDataList =locals.getObject("cardDataList");
    if(cardDataList==null || cardDataList.length==null||cardDataList.length==null||cardDataList.length==0){
        $scope.getCardListData();
    }else{
            $scope.cardDataList = cardDataList;
    }
    $scope.showCardList = false;
    $scope.showCardListData = function () {
        cardDataList = locals.getObject("cardDataList");
        $scope.showCardList = true;
        $scope.cardDataList = cardDataList;
    };

    $scope.toSelectPage=function(){
        $state.go("Register");
    }

    $scope.tabShow = true;
    $scope.$watch('carInfo.shortCardName',function(){
        var cardDataListForSerch = locals.getObject("cardDataList");
        var searchName =$scope.carInfo.shortCardName;
        var newCarArray = new Array();
        if(cardDataListForSerch!=null && cardDataListForSerch.length!=null &&cardDataListForSerch.length>0){
        for(var i=0;i<cardDataListForSerch.length;i++){
            var carInfoS = cardDataListForSerch[i];
            if(cardDataListForSerch[i].mc!=null&&cardDataListForSerch[i].mc.indexOf(searchName)!=-1){
                newCarArray.push(carInfoS);
            }
        }
        }
        $scope.cardDataList = newCarArray;
        if((newCarArray==null||newCarArray.length==null||newCarArray.length==0)&&searchName.length==6){
            var serchNameT = $scope.proName + searchName;
            var params = {
            db:locals.get("Data_Source_name"),
                function:"sp_fun_down_cp_one",
                company_code:user.company_code,
                cp:serchNameT
            };
            var jsonString =  angular.toJson(params);
            $http({
                method: 'post',
                url: '/restful/pro',
                dataType: "json",
                data: jsonString,
            }).success(function (data, status, headers, config) {
                var state = data.state;

                if (state == 'ok') {
                    var carForDataList = data.data;
                    if(carForDataList!=null && carForDataList.length!=null&&carForDataList.length>0){
                        $scope.cardDataList = carForDataList;
                        locals.setObject("cardDataList",locals.getObject("cardDataList").concat(carForDataList));
                    }
                }
            }).error(function(data){
                ionicToast.show("服务异常","middle",2000);
            });
        }
    });

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
        var gdData = new Object();
        $scope.gdData = gdData;
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr3
        }).success(function (data, status, headers, config) {
            console.log(data);
            var state = data.state;
            if (state == 'ok') {

                $state.go("Tender");
            }
        }).error(function(data){
            ionicToast.show("服务异常","middle",2000);
        });
    }

    var gz_jc_date="";
    var gz_customer_id = "";
    var gz_jsd_id = "";

    $scope.showGuzhangT = function (gzDesc) {//故障上传

        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_update_fault_info",
            customer_id: gz_customer_id,
            car_fault: gzDesc?gzDesc:"",
            days:gz_jc_date
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
                $state.go("Tender");
            }

        }).error(function (data) {

        });
    }


        //5-3：新车上传信息。
    $scope.uploadCardInfo = function (upLoadInfo) {

        locals.setObject("repairDataList", new Array());

        if(upLoadInfo.shortCardName==null||upLoadInfo.shortCardName==""){
            ionicToast.show('车牌必填', 'middle',false, 1000);
            return;
        }

        if(upLoadInfo.shortCardName!=null&&upLoadInfo.shortCardName.length!=null&&upLoadInfo.shortCardName.length!=6){
            ionicToast.show('车牌号输入错误', 'middle',false, 1000);
            return;
        }

        if(upLoadInfo.linkman==null||upLoadInfo.linkman==""){
            ionicToast.show('报修人必填', 'middle',false, 1000);
            return;
        }
        if(upLoadInfo.mobile==null||upLoadInfo.mobile==""){
            ionicToast.show('手机号必填', 'middle',false, 1000);
            return;
        }
        if(upLoadInfo.mobile!=null&&(upLoadInfo.mobile+'').length!=null&&(upLoadInfo.mobile+'').length!=11){
            ionicToast.show('手机号输入有误', 'middle',false, 1000);
            return;
        }

        upLoadInfo.cardName = $scope.proName + $scope.carInfo.shortCardName;
        locals.set("gonglishu",upLoadInfo.gls==null?"":upLoadInfo.gls);
        var isNewCar = $scope.judgeNewCar(upLoadInfo.cardName);
        var allCarList = locals.getObject("cardDataList");
        upLoadInfo.cp= upLoadInfo.cardName;
        upLoadInfo.momo= upLoadInfo.gzms;
        upLoadInfo.jclc= upLoadInfo.gls;
        upLoadInfo.mc= upLoadInfo.cardName;
        if(isNewCar){//如果是新车，就调用5-3 新车上传信息。
            upLoadInfo.company_code = user.company_code;
            var params = {
            db:locals.get("Data_Source_name"),
                function:"sp_fun_upload_customer_info",
                company_code:user.company_code,
                plate_number:upLoadInfo.cardName?upLoadInfo.cardName:"",
                cz:upLoadInfo.cz,
                mobile:upLoadInfo.mobile+'',
                phone: '',
                linkman:upLoadInfo.linkman,
                custom5:upLoadInfo.custom5,
                cx:upLoadInfo.cx,
                cjhm:upLoadInfo.cjhm,
                fdjhm:upLoadInfo.fdjhm,
                oprater_code:userName
            }
            var jsonStr = angular.toJson(params);
            $http({
                method: 'post',
                url: '/restful/pro',
                dataType: "json",
                data: jsonStr,
            }).success(function (data, status, headers, config) {
                var state = data.state;
                if (state == 'ok') {
                    upLoadInfo.customer_id=data.customer_id;
                    gz_customer_id = data.customer_id;
                    upLoadInfo.plate_number = upLoadInfo.cardName?upLoadInfo.cardName:"";
                    allCarList.push(upLoadInfo);
                    locals.setObject("cardDataList",allCarList);
                    locals.setObject("carInfo",upLoadInfo);
                    $scope.uploadCarToServer(upLoadInfo);
                }else {
                    ionicToast.show("错误："+data.msg?data.msg:"", 'middle',false, 2000);
                }
            }).error(function(data){
                ionicToast.show("服务异常","middle",2000);
            });

        }else{  //2，如果不是新车，就更新车辆信息
            var params = {
                db:locals.get("Data_Source_name"),
                function:"sp_fun_update_customer_info",
                cz:upLoadInfo.cz,
                mobile:upLoadInfo.mobile+'',
                phone: '',
                linkman:upLoadInfo.linkman,
                custom5:upLoadInfo.custom5,
                cx:upLoadInfo.cx,
                cjhm:upLoadInfo.cjhm,
                fdjhm:upLoadInfo.fdjhm,
                customer_id:upLoadInfo.customer_id
            }
            var jsonStr = angular.toJson(params);
            $http({
                method: 'post',
                url: '/restful/pro',
                dataType: "json",
                data: jsonStr,
            }).success(function (data, status, headers, config) {
                var state = data.state;
                if (state == 'ok') {
                    var allCarList = locals.getObject("cardDataList");
                    upLoadInfo.plate_number = upLoadInfo.cardName?upLoadInfo.cardName:"";
                    allCarList.splice(flagNumber,1,upLoadInfo);
                    allCarList.push(upLoadInfo);
                    locals.setObject("cardDataList",allCarList);
                    locals.setObject("carInfo",upLoadInfo);
                    $scope.uploadCarToServer(upLoadInfo);
                }else {
                    ionicToast.show("错误："+data.msg?data.msg:"", 'middle',false, 2000);
                }
            }).error(function(data){
                ionicToast.show("服务异常","middle",2000);
            });

        }

    }


    var repairPersonList = locals.getObject("repairPersonList");
    if(repairPersonList==null||repairPersonList.length==null||repairPersonList.length==0||repairPersonList=="undefined"){
        var params={
            db:locals.get("Data_Source_name"),
            function:"sp_fun_down_repairman",
            company_code:user.company_code
        }
        var jsonStr = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr,
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == 'ok') {
                locals.setObject("repairPersonList",data.data);
            }else {
            }
        }).error(function(data){
            ionicToast.show("服务异常","middle",2000);
        });
    }

    //3  5-9：检查是否有未完工的单据
    $scope.uploadCarToServer=function(upLoadInfo){
        var params = {
            db:locals.get("Data_Source_name"),
            function:"sp_fun_check_repair_list_cp",
            customer_id:upLoadInfo.customer_id
        }
        var jsonStr = angular.toJson(params);
            $http({
                method: 'post',
                url: '/restful/pro',
                dataType: "json",
                data: jsonStr,
            }).success(function (data, status, headers, config) {
                var state = data.state;
                if (state == 'ok') {
                   //车辆已进厂
                    data.upLoadInfo = upLoadInfo;
                    $scope.openModal(data);
                }else {
                    //车辆未进厂,
                    $scope.insertCarInfo(upLoadInfo);
                }
            }).error(function(data){
                ionicToast.show("服务异常","middle",2000);
            });

        }


    $scope.guanZhu = function(carInfoParam){
        if(carInfoParam.openid) {
            ionicToast.show("公众号已关注，无需再次关注", 'middle', false, 2000);
        }else{
            $state.go("CompanyDetail");
        }


    }


        //4  5-8：生成接车单。
    $scope.insertCarInfo = function(upLoadInfo){
        var dateTime=$scope.getDateTime();
        gz_jc_date = dateTime;
        var params = {
            db:locals.get("Data_Source_name"),
            function:"sp_fun_upload_repair_list_main",
            company_code:user.company_code,
            plate_number:upLoadInfo.cardName?upLoadInfo.cardName:"",
            cz:upLoadInfo.cz,
            mobile:upLoadInfo.mobile+'',
            phone: '',
            linkman:upLoadInfo.linkman,
            cx:upLoadInfo.cx,
            cjhm:upLoadInfo.cjhm,
            fdjhm:upLoadInfo.fdjhm,
            ns_date:dateTime,
            oprater_code:userName,
            xllb:"",
            jclc:upLoadInfo.gls+"",
            ywg_date:upLoadInfo.ywg_date?(upLoadInfo.ywg_date+" 00:00:00"):dateTime,
            keys_no:upLoadInfo.ysph,
            memo:upLoadInfo.ywtx,
            customer_id:upLoadInfo.customer_id,
            jsd_id:''

        };
        var jsonStr = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr,
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == 'ok') {
                locals.set("jsd_id",data.jsd_id);

                    gz_jsd_id = data.jsd_id;
                    if($scope.carInfo.gzms){
                      $scope.showGuzhangT($scope.carInfo.gzms);
                    }else{
                        $state.go("Tender");
                    }



            }else {
                ionicToast.show("错误："+data.msg?data.msg:"", 'middle',false, 2000);
            }
        }).error(function(data){
            ionicToast.show("服务异常","middle",2000);
        });
    }
    $scope.openModal = function(data) {
        var modalInstance = $modal.open({
            templateUrl : 'modal.html',//script标签中定义的id
            controller : 'modalCtrl',//modal对应的Controller
            size: 'lg',
            resolve : {
                data : function() {//data作为modal的controller传入的参数
                    return data;//用于传递数据
                }
            }
        })
    }



    $scope.showCardName = function(item){
        carInfo = item;
        carInfo.mobile = item.mobile?Number(item.mobile):"";
        carInfo.company_code=user.company_code;
        carInfo.cx=item.cx;
        carInfo.cardName=item.mc;
        carInfo.shortCardName=item.mc.substring(1,item.mc.length);
        carInfo.openid = item.openid;
        $scope.carInfo=carInfo;
        $scope.showCardList = false;
        $scope.proName = item.mc.substring(0,1);

    }

    $scope.getAutorData=function(){
        var params = {
            db:locals.get("Data_Source_name"),
            function:"sp_fun_get_oprater_right",
            operater_code:userName
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
            if (state == 'ok') {
                var dataArr = data.data;
                if(dataArr!=null&&dataArr.length>0){
                    locals.set('isFirstLogin',1);
                }
                for(var i=0;i<dataArr.length;i++){
                    var item = dataArr[i];
                    locals.setObject(item.menu_right,item);
                }
            }
        }).error(function(data){
            ionicToast.show("服务异常","middle",2000);
        });
    }

    if(locals.get('isFirstLogin',0)==0){
        $scope.getAutorData();
    }

//获取项目一级页面配置

    $scope.getFirstPageData=function(){

        var params={
            db:locals.get("Data_Source_name"),
            function:"sp_fun_down_maintenance_category"
        }

        var jsonStr = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if(state=="ok"){
                var firstIconArr = data.data;
                $scope.firstIconArr = firstIconArr;
                locals.setObject("firstIconArr",firstIconArr);
            }
        }).error(function(data){
            ionicToast.show("服务异常","middle",2000);
        });
    }
    if(locals.getObject("firstIconArr")==null||locals.getObject("firstIconArr").length==null||locals.getObject("firstIconArr").length==0){
        $scope.getFirstPageData();
   }

//获取项目二级页面配置
    var kjProList = [];
    var chgProList = [];
    var baoyangList = [];
    var postFlag = "0";

    $scope.getIconData = function () {
        if (postFlag == "end") {
            locals.setObject("kjProList",kjProList);
            locals.setObject("chgProList",chgProList);
            locals.setObject("baoyangList",baoyangList);
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
                    if (item.tybz=="0"&&item.wxgz!=null&&item.wxgz!='') {
                        if (item.is_quick_project == "是") {
                            kjProList.push(item);
                        }else if(item.is_quick_project == "否"){
                            chgProList.push(item);
                        }

                        var baoyangArray = baoyangMap.get(item.tybz);
                        if(baoyangArray==null||baoyangArray.length==0){
                            baoyangArray = new Array();
                        }
                        baoyangMap.set(item.tybz,baoyangArray.push(item))
                    }else if(item.tybz=="2"){
                        baoyangList.push(item);
                    }
                }
            }
            $scope.getIconData();
        }).error(function (data) {
            ionicToast.show("服务异常","middle",2000);
        });
    }
    if(locals.getObject("kjProList")==null||locals.getObject("chgProList")==null||locals.getObject("kjProList").length==null||locals.getObject("kjProList").length==0||locals.getObject("chgProList").length==null||locals.getObject("chgProList").length==0){
        $scope.getIconData();
    }

    $scope.judgeNewCar=function(cardName){

        if(allCardDataList!=null && allCardDataList.length>0){

            for(var i=0;i<allCardDataList.length;i++){
                var itemCar = allCardDataList[i];
                if(cardName==itemCar.mc){
                    flagNumber = i;
                    return false;
                }
            }
        }
        return true;
    }



}]);






//模态框对应的Controller
app.controller('modalMCtrl', function ($scope, $state, $modalInstance) {

    $scope.selectCard = function(resText){
        $modalInstance.close(resText);
    }
});



//模态框对应的Controller
app.controller('modalCtrl', function($scope,$state, $modalInstance,locals,data) {
    $scope.data= data;

    //在这里处理要进行的操作
    $scope.ok = function() {
        $modalInstance.close();
        var carInfo = locals.getObject("carInfo");
        carInfo.jsd_id = data.jsd_id;
        locals.setObject("carInfo",carInfo);
        locals.set("jsd_id",data.jsd_id);
        $state.go("Winbding");

    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
});