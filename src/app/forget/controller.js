app.controller('ForgetCtrl', ['$http', '$scope', '$state', "locals", "ionicToast","$stateParams", function ($http, $scope, $state, locals, ionicToast, $stateParams) {
    $scope.showMore = 0;
    var pre_row_number = "0";
    var factoryDataArr = new Array();
    var id= $stateParams.id;
    var queryStatuStr = "待领工";
    $scope.showMore=id;
    if(id==0) {
         queryStatuStr = "待领工";
    }else if(id==1) {
         queryStatuStr = "修理中";
    }else if(id==2) {
         queryStatuStr = "待质检";
    }else if(id==3) {
         queryStatuStr = "已完工";
    }
    $scope.showMoreView = function (showMore, queryState) {
        queryStatuStr = queryState;
        $scope.showMore = showMore;
        pre_row_number = "0";
        factoryDataArr = new Array();
        $scope.getListData();

    }

    $scope.getListData = function () {
        var user = locals.getObject("user");
        if (pre_row_number == "end") {

            $scope.factoryDataArr = factoryDataArr;
            return;
        }
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_repair_project_state",
            company_code: user.company_code,
            states: queryStatuStr,
            pre_row_number: pre_row_number
        }
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
            pre_row_number = data.pre_row_number;
            if (state == 'ok') {
                factoryDataArr = factoryDataArr.concat(data.data);
                if (pre_row_number == "end") {
                    $scope.factoryDataArr = factoryDataArr;
                    return;
                }
                $scope.getListData();
            } else {
                if(data.pre_row_number=="end"){
                    $scope.factoryDataArr = factoryDataArr;
                }else {
                    $scope.factoryDataArr = new Array();
                }
                return;
            }

        });
    }
    $scope.getListData();


    $scope.toLinggongPage = function (item) {
        locals.set("jsd_id", item.jsd_id);
        item.cardName = item.cp;
        locals.setObject("carInfo", item);

        var states = item.states;
        if (states == '待领工') {
            $state.go("TiaozhengPage");
        } else if (states == '修理中') {
            $state.go("HuanRen");

        } else if (states == '待质检'||states == '返工') {
            $state.go("JianyanPage");

        } else if (states == '已完工') {
            $state.go("WanGong");

        }
    }


    $scope.getFirstPageData = function () {

        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_maintenance_category"
        }

        var jsonStr6 = angular.toJson(params);
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
            }
        }).error(function (data) {
            console.log(data);
        });
    }

    var firstIconArr = locals.getObject("firstIconArr");

    if (firstIconArr == null || firstIconArr.length == 0) {

        $scope.getFirstPageData();

    } else {
        $scope.firstIconArr = firstIconArr;
    }
    $scope.isShowSelect = false;
    $scope.showSelectDiv = function (isShowSelect) {
        $scope.isShowSelect = !isShowSelect;
    }

    $scope.selectItem = function (item) {
        $scope.wxgz = item.wxgz;
        $scope.isShowSelect = false;
    }
    $scope.content = "";
    $scope.wxgz = "";
    $scope.searchData = function () {
        var content = $scope.content;
        var wxgz = $scope.wxgz;
        if (wxgz == '选择工种') {
            wxgz = '';
        }
        if (factoryDataArr == null || factoryDataArr.length == 0) {
            return;
        }
        if (content == null) {
            $scope.factoryDataArr = factoryDataArr;
            return;
        }
        var newFactoryArr = new Array();
        for (var i = 0; i < factoryDataArr.length; i++) {
            var factoryData = factoryDataArr[i];

            if (((factoryData.jsd_id).indexOf(content) != -1
                    || (factoryData.cp).indexOf(content) != -1
                    || (factoryData.cx).indexOf(content) != -1
                    || (factoryData.cjhm).indexOf(content) != -1
                    || (factoryData.wxgz).indexOf(content) != -1
                    || (factoryData.xlg).indexOf(content) != -1
                    || (factoryData.states).indexOf(content) != -1
                    || (factoryData.jc_date).indexOf(content) != -1
                    || (factoryData.assign).indexOf(content) != -1) && ((factoryData.wxgz).indexOf(wxgz) != -1)) {
                newFactoryArr.push(factoryData);
            }
        }
        $scope.factoryDataArr = newFactoryArr;
    }


    $scope.bubbleSort = function (arr, isUp) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {

                var jcDateJ = arr[j].jc_date ? arr[j].jc_date : '0';
                var jcDateK = arr[j + 1].jc_date ? arr[j + 1].jc_date : '0';
                var newJcDateJ = jcDateJ.replace(/:/g, '').replace(/-/g, '').replace(' ', '');
                var newJcDateK = jcDateK.replace(/:/g, '').replace(/-/g, '').replace(' ', '');
                if (isUp) {

                    if (newJcDateJ > newJcDateK) {
                        var temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                } else {
                    if (newJcDateJ < newJcDateK) {
                        var temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }

            }
        }
        return arr;
    }
    $scope.showUp=true;
    $scope.sortByJcTime=function(showUp){
        $scope.showUp = !showUp;
       var sortFactoryDataArr = $scope.bubbleSort(factoryDataArr,$scope.showUp);
        $scope.factoryDataArr = sortFactoryDataArr;
    }



    $scope.bubbleYwgSort = function (arr, isUp) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {

                var jcDateJ = arr[j].ywg_date ? arr[j].ywg_date : '0';
                var jcDateK = arr[j + 1].ywg_date ? arr[j + 1].ywg_date : '0';
                var newJcDateJ = jcDateJ.replace(/:/g, '').replace(/-/g, '').replace(' ', '');
                var newJcDateK = jcDateK.replace(/:/g, '').replace(/-/g, '').replace(' ', '');
                if (isUp) {

                    if (newJcDateJ > newJcDateK) {
                        var temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                } else {
                    if (newJcDateJ < newJcDateK) {
                        var temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }

            }
        }
        return arr;
    }

    $scope.sortByYwgTime=function(showYwgUp){
        $scope.showYwgUp = !showYwgUp;
       var sortFactoryDataArr = $scope.bubbleYwgSort(factoryDataArr,$scope.showYwgUp);
        $scope.factoryDataArr = sortFactoryDataArr;
    }

    var user = locals.getObject("user");
    $scope.showMySelf=function(isShowMyWork){
        $scope.isShowMyWork = !isShowMyWork;

        if($scope.isShowMyWork) {
            var newFactoryArr = new Array();
            for (var i = 0; i < factoryDataArr.length; i++) {
                var factoryData = factoryDataArr[i];

                if (factoryData.assign==user.chinese_name) {
                    newFactoryArr.push(factoryData);
                }
            }
            $scope.factoryDataArr = newFactoryArr;
        }else{
            $scope.factoryDataArr = factoryDataArr;
        }

    }
}]);


app.controller('LinggongCtrl', ['$http', '$scope', '$state', "locals", "ionicToast", function ($http, $scope, $state, locals, ionicToast) {

    var jsd_id = locals.get("jsd_id");
    $scope.goBackPage = function () {
        window.history.back();
    }

    $scope.getLinggongData = function () {
        var user = locals.getObject("user");
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_repair_project_schedule",
            jsd_id: jsd_id
        }
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
                var dataArr = data.data;
                $scope.dataArr = dataArr;
            }
        });
    }
    $scope.getLinggongData();

}]);


app.controller('TiaozhengCtrl', ['$http', '$scope', '$state', "locals", "ionicToast", function ($http, $scope, $state, locals, ionicToast) {
    var factoryItem = locals.getObject("carInfo");
    $scope.factoryItem = factoryItem;

    var jsd_id = locals.get("jsd_id");
    $scope.goBackPage = function () {
        window.history.back();
    }
    var dataArr = new Array();

    $scope.getLinggongData = function () {
        var user = locals.getObject("user");
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_repair_project_schedule",
            jsd_id: jsd_id
        }
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
               dataArr = data.data;
                var newDataArr = new Array();
                for(var i=0;i<dataArr.length;i++){

                        dataArr[i].choose=false;
                        newDataArr.push(dataArr[i]);

                }
                $scope.dataArr = newDataArr;
            }
        });
    }
    $scope.getLinggongData();



    $scope.lingGong = function () {
        var user = locals.getObject("user");

        var tjDataArr = $scope.dataArr;
        var xhStr="";
        if(tjDataArr&&tjDataArr.length&&tjDataArr.length>0){
            for(var i=0;i<tjDataArr.length;i++){
                var tjBean = tjDataArr[i];
                if(tjBean.choose){
                    xhStr+=tjBean.xh+",";
                }
            }
        }
        if(xhStr==""){
            ionicToast.show("您还未选择", 'middle', false, 2000);
            return;
        }
        xhStr=xhStr.substring(0,xhStr.length-1);
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_update_jsdmx_xlxm_xlg",
            jsd_id: jsd_id,
            xh_list:xhStr,
            assign: user.chinese_name
        }
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
                ionicToast.show("领工成功", 'middle', false, 2000);
                //$scope.getLinggongData();
               // $state.go("FactoryPage",{id:0});
                $scope.getLinggongData();
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        });
    }




    var selectAll = false;
    $scope.selectAll=selectAll;
    $scope.chooseAll= function (selectAll) {
        var newDataArr = new Array();
        var tmpDataArr = $scope.dataArr;
        for(var i=0;i<tmpDataArr.length;i++){
            $scope.selectAll = !selectAll;
            var dataBean = tmpDataArr[i];
            if(!selectAll){
                dataBean.choose=true;
            }else {
                dataBean.choose=false;
            }
            newDataArr.push(dataBean);
        }
        $scope.dataArr = newDataArr;
    }


    $scope.chooseItem=function(index,item,itemChoose){
        item.choose = !itemChoose;
        if(!item.choose){
            $scope.selectAll=false;
        }
        $scope.dataArr.splice(index,item);
        var tmpDataArr =  $scope.dataArr;
        var chooseSize = 0;
        for(var i=0;i<tmpDataArr.length;i++){
            var tmpBean = tmpDataArr[i];
            if(tmpBean.choose){
                chooseSize++;
            }
        }
        if(chooseSize==tmpDataArr.length){
            $scope.selectAll=true;
        }else{
            $scope.selectAll=false;
        }

    }



}]);


//检验
app.controller('JianyanCtrl', ['$http', '$scope', '$state', "locals", "ionicToast", function ($http, $scope, $state, locals, ionicToast) {

    var factoryItem = locals.getObject("carInfo");
    $scope.factoryItem = factoryItem;

    var jsd_id = locals.get("jsd_id");
    $scope.goBackPage = function () {
        window.history.back();
    }

    $scope.getLinggongData = function () {
        var user = locals.getObject("user");
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_repair_project_schedule",
            jsd_id: jsd_id
        }
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
                var dataArr = data.data;
                var newDataArr = new Array();
                for(var i=0;i<dataArr.length;i++){

                    dataArr[i].choose=false;
                    newDataArr.push(dataArr[i]);

                }
                $scope.dataArr = newDataArr;
            }
        });
    }
    $scope.getLinggongData();

    $scope.fanGong = function () {

        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_update_repair_list_state",
            jsd_id: jsd_id,
            states: "",
            xm_state: "返工"
        }
        var jsonStr3 = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr3
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == 'ok') {

                ionicToast.show("处理成功", 'middle', false, 2000);
                //$state.go("FactoryPage",{id:2});
                $scope.getLinggongData();
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });


    }




    var selectAll = false;
    $scope.selectAll=selectAll;
    $scope.chooseAll= function (selectAll) {
        var newDataArr = new Array();
        var tmpDataArr = $scope.dataArr;
        for(var i=0;i<tmpDataArr.length;i++){
            $scope.selectAll = !selectAll;
            var dataBean = tmpDataArr[i];
            if(!selectAll){
                dataBean.choose=true;
            }else {
                dataBean.choose=false;
            }
            newDataArr.push(dataBean);
        }
        $scope.dataArr = newDataArr;
    }



    $scope.chooseItem=function(index,item,itemChoose){
        item.choose = !itemChoose;
        if(!item.choose){
            $scope.selectAll=false;
        }
        $scope.dataArr.splice(index,item);
        var tmpDataArr =  $scope.dataArr;
        var chooseSize = 0;
        for(var i=0;i<tmpDataArr.length;i++){
            var tmpBean = tmpDataArr[i];
            if(tmpBean.choose){
                chooseSize++;
            }
        }
        if(chooseSize==tmpDataArr.length){
            $scope.selectAll=true;
        }else{
            $scope.selectAll=false;
        }

    }

    $scope.passCheck=function(){

        var jsd_id = locals.get("jsd_id");
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_update_repair_list_state",
            jsd_id: jsd_id,
            states: "",
            xm_state: "已完工"
        }
        var jsonStr7 = angular.toJson(params);
        $scope.xlfTotal = 0;
        $scope.numZk = 0;
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr7
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == 'ok') {
                ionicToast.show("处理成功", 'middle', false, 2000);
               // $state.go("FactoryPage",{id:2})
                $scope.getLinggongData();
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常","middle",2000);
        });
    }

}]);


//完工
app.controller('WanGongCtrl', ['$http', '$scope', '$state', "locals", "ionicToast", function ($http, $scope, $state, locals, ionicToast) {
    var factoryItem = locals.getObject("carInfo");
    $scope.factoryItem = factoryItem;


    var jsd_id = locals.get("jsd_id");
    $scope.goBackPage = function () {
        window.history.back();
    }

    $scope.getLinggongData = function () {
        var user = locals.getObject("user");
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_repair_project_schedule",
            jsd_id: jsd_id
        }
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
                var dataArr = data.data;

                var newDataArr = new Array();
                for(var i=0;i<dataArr.length;i++){
                  //  if(dataArr[i].states=="已完工"){
                        dataArr[i].choose=false;
                        newDataArr.push(dataArr[i]);
                   // }
                }
                $scope.dataArr = newDataArr;
            }
        });
    }
    $scope.getLinggongData();
    $scope.cancleCheck = function(){

        var jsd_id = locals.get("jsd_id");
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_update_repair_list_state",
            jsd_id: jsd_id,
            states: "修理中",
            xm_state: "待质检"
        }
        var jsonStr7 = angular.toJson(params);
        $scope.xlfTotal = 0;
        $scope.numZk = 0;
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr7
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == 'ok') {
                ionicToast.show("处理成功", 'middle', false, 2000);
               // $scope.getLinggongData();

               // $state.go("FactoryPage",{id:3});
                $scope.getLinggongData();
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常","middle",2000);
        });
    }

    var selectAll = false;
    $scope.selectAll=selectAll;
    $scope.chooseAll= function (selectAll) {
        var newDataArr = new Array();
        var tmpDataArr = $scope.dataArr;
        for(var i=0;i<tmpDataArr.length;i++){
            $scope.selectAll = !selectAll;
            var dataBean = tmpDataArr[i];
            if(!selectAll){
                dataBean.choose=true;
            }else {
                dataBean.choose=false;
            }
            newDataArr.push(dataBean);
        }
        $scope.dataArr = newDataArr;
    }



    $scope.chooseItem=function(index,item,itemChoose){
        item.choose = !itemChoose;
        if(!item.choose){
            $scope.selectAll=false;
        }
        $scope.dataArr.splice(index,item);
        var tmpDataArr =  $scope.dataArr;
        var chooseSize = 0;
        for(var i=0;i<tmpDataArr.length;i++){
            var tmpBean = tmpDataArr[i];
            if(tmpBean.choose){
                chooseSize++;
            }
        }
        if(chooseSize==tmpDataArr.length){
            $scope.selectAll=true;
        }else{
            $scope.selectAll=false;
        }

    }

}]);


//换人
app.controller('HuanRenCtrl', ['$http', '$scope', '$state', "locals", "ionicToast","$modal", function ($http, $scope, $state, locals, ionicToast,$modal) {
    var selectAll = false;
    var factoryItem = locals.getObject("carInfo");
    $scope.factoryItem = factoryItem;

    var jsd_id = locals.get("jsd_id");
    var user = locals.get("user");
    $scope.goBackPage = function () {
        window.history.back();
    }
    $scope.getLinggongData = function () {
        selectAll = false;
        $scope.selectAll=selectAll;
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_repair_project_schedule",
            jsd_id: jsd_id
        }
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
                var dataArr = data.data;

                var newDataArr = new Array();
                for(var i=0;i<dataArr.length;i++){
                  //  if(dataArr[i].states=="修理中"){
                        dataArr[i].choose=false;
                        newDataArr.push(dataArr[i]);
                   // }
                }
                $scope.dataArr = newDataArr;
            }
        });
    }
    $scope.getLinggongData();
    function getRepairData() {
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_repairman",
            company_code: user.company_code
        }
        var jsonStr = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr,
        }).success(function (data) {
            var state = data.state;
            if (state == 'ok') {
                locals.setObject("repairPersonList", data.data);
            } else {
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });
    }

    var repairPersonList = locals.getObject("repairPersonList");

    if (repairPersonList == null || repairPersonList.length == null || repairPersonList.length == 0) {
        getRepairData();
    }
    //加人
    $scope.jiaRen = function () {
        var repairPersonList = locals.getObject("repairPersonList");
        data = repairPersonList;
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'modalAdd.html',
            controller: 'modalLgCtrl',
            size: 'lg',
            resolve: {
                data: function () {//data作为modal的controller传入的参数
                    return data;//用于传递数据
                }
            }
        });

        modalInstance.result.then(function (item) {
            var user = locals.getObject("user");
            var tjDataArr = $scope.dataArr;
            var xhStr="";
            if(tjDataArr&&tjDataArr.length&&tjDataArr.length>0){
                for(var i=0;i<tjDataArr.length;i++){
                    var tjBean = tjDataArr[i];
                    if(tjBean.choose){
                        xhStr+=tjBean.xh+",";
                    }
                }
            }
            if(xhStr==""){
                ionicToast.show("您还未选择", 'middle', false, 2000);
                return;
            }
            xhStr=xhStr.substring(0,xhStr.length-1);
            var params = {
                db: locals.get("Data_Source_name"),
                function: "sp_fun_update_jsdmx_xlxm_xlg_add",
                jsd_id: jsd_id,
                xh_list:xhStr,
                assign: item.xlg
            }
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
                    ionicToast.show("处理成功", 'middle', false, 2000);
                    $scope.getLinggongData();
                } else {
                    ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
                }
            });


        }, function () {

        });

    }
    $scope.tuiGong=function(){
        var user = locals.getObject("user");
        var tjDataArr = $scope.dataArr;
        var xhStr="";
        if(tjDataArr&&tjDataArr.length&&tjDataArr.length>0){
            for(var i=0;i<tjDataArr.length;i++){
                var tjBean = tjDataArr[i];
                if(tjBean.choose){
                    xhStr+=tjBean.xh+",";
                }
            }
        }
        if(xhStr==""){
            ionicToast.show("您还未选择", 'middle', false, 2000);
            return;
        }
        xhStr=xhStr.substring(0,xhStr.length-1);
        var params = {

            db: locals.get("Data_Source_name"),
            function: "sp_fun_update_jsdmx_xlxm_xlg",
            jsd_id: jsd_id,
            xh_list:xhStr,
            assign: ""
        }
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
                ionicToast.show("处理成功", 'middle', false, 2000);
                $scope.getLinggongData();
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        });


    }
    //换人


    $scope.replacePerson = function () {
        var repairPersonList = locals.getObject("repairPersonList");
        data = repairPersonList;
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'modal8.html',
            controller: 'modalLgCtrl',
            size: 'lg',
            resolve: {
                data: function () {//data作为modal的controller传入的参数
                    return data;//用于传递数据
                }
            }
        });

        modalInstance.result.then(function (choosePerson) {


            var user = locals.getObject("user");

            var tjDataArr = $scope.dataArr;
            var xhStr="";
            if(tjDataArr&&tjDataArr.length&&tjDataArr.length>0){
                for(var i=0;i<tjDataArr.length;i++){
                    var tjBean = tjDataArr[i];
                    if(tjBean.choose){
                        xhStr+=tjBean.xh+",";
                    }
                }
            }
            if(xhStr==""){
                ionicToast.show("您还未选择", 'middle', false, 2000);
                return;
            }
            xhStr=xhStr.substring(0,xhStr.length-1);
            var params = {
                db: locals.get("Data_Source_name"),
                function: "sp_fun_update_jsdmx_xlxm_xlg",
                jsd_id: jsd_id,
                xh_list:xhStr,
                assign: choosePerson
            }
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
                    ionicToast.show("处理成功", 'middle', false, 2000);
                    $scope.getLinggongData();
                } else {
                    ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
                }
            });


        }, function () {

        });
    }





    $scope.selectAll=selectAll;
    $scope.chooseAll= function (selectAll) {
        var newDataArr = new Array();
        var tmpDataArr = $scope.dataArr;
        for(var i=0;i<tmpDataArr.length;i++){
            $scope.selectAll = !selectAll;
            var dataBean = tmpDataArr[i];
            if(!selectAll){
                dataBean.choose=true;
            }else {
                dataBean.choose=false;
            }
            newDataArr.push(dataBean);
        }
        $scope.dataArr = newDataArr;
    }



    $scope.chooseItem=function(index,item,itemChoose){
        item.choose = !itemChoose;
        if(!item.choose){
            $scope.selectAll=false;
        }
        $scope.dataArr.splice(index,item);
        var tmpDataArr =  $scope.dataArr;
        var chooseSize = 0;
        for(var i=0;i<tmpDataArr.length;i++){
            var tmpBean = tmpDataArr[i];
            if(tmpBean.choose){
                chooseSize++;
            }
        }
        if(chooseSize==tmpDataArr.length){
            $scope.selectAll=true;
        }else{
            $scope.selectAll=false;
        }

    }

    //完工
    $scope.siGongWanBi=function(){
            var jsd_id = locals.get("jsd_id");
            var params = {
                db: locals.get("Data_Source_name"),
                function: "sp_fun_update_repair_list_state",
                jsd_id: jsd_id,
                states: "已完工",
                xm_state: "已完工"
            }
            var jsonStr7 = angular.toJson(params);
            $scope.xlfTotal = 0;
            $scope.numZk = 0;
            $http({
                method: 'post',
                url: '/restful/pro',
                dataType: "json",
                data: jsonStr7

            }).success(function (data, status, headers, config){
                var state = data.state;
                if (state == 'ok') {
                    ionicToast.show("处理成功", 'middle', false, 2000);
                    $state.go("FactoryPage",{id:1});
                } else {
                    ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
                }
            }).error(function (data) {
                ionicToast.show("服务异常","middle",2000);
            });
    }


    //弹出模态框-----------------------

    $scope.pgPerson = function (item) {
        var repairPersonList = locals.getObject("repairPersonList");
        data = repairPersonList;
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'modal7.html',
            controller: 'modalLgCtrl',
            size: 'lg',
            resolve: {
                data: function () {//data作为modal的controller传入的参数
                    return data;//用于传递数据
                }
            }
        });

        modalInstance.result.then(function (choosePersonStr) {
            if (choosePersonStr != null && choosePersonStr[choosePersonStr.length - 1] == ",") {
                choosePersonStr = choosePersonStr.substring(0, choosePersonStr.length - 1);
            }

            var user = locals.getObject("user");

            var tjDataArr = $scope.dataArr;
            var xhStr="";
            if(tjDataArr&&tjDataArr.length&&tjDataArr.length>0){
                for(var i=0;i<tjDataArr.length;i++){
                    var tjBean = tjDataArr[i];
                    if(tjBean.choose){
                        xhStr+=tjBean.xh+",";
                    }
                }
            }
            if(xhStr==""){
                ionicToast.show("您还未选择", 'middle', false, 2000);
                return;
            }


             xhStr=xhStr.substring(0,xhStr.length-1);
            $scope.addMan(xhStr,choosePersonStr);


            /*var pgDataList = $scope.pgDataList;
            var jsd_id = locals.get("jsd_id");
            if (pgDataList != null && pgDataList.length > 0) {
                for (var i = 0; i < pgDataList.length; i++) {
                    var pgData = pgDataList[i];
                    if (pgData.checked) {
                        $scope.toPGDataToServer(jsd_id, choosePersonStr, pgData.xh)
                    }
                }
            }*/
        }, function () {

        });
    }


    //加人
    $scope.addMan = function (xhStr,xlgStr) {
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_update_jsdmx_xlxm_xlg_add",
            jsd_id: jsd_id,
            xh_list:xhStr,
            assign: xlgStr
        }
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
                ionicToast.show("处理成功", 'middle', false, 2000);
                $scope.getLinggongData();
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        });


    }


}]);



//模态框对应的Controller
app.controller('modalRepCtrl', function ($scope, $state, $modalInstance, locals, data) {
    $scope.repairPersonList = data;

    $scope.chooseXlz = function (item) {
        
        $modalInstance.close(item);
    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
});





//模态框对应的Controller
app.controller('modalLgCtrl', function ($scope, $state, $modalInstance, locals, data,ionicToast) {
    $scope.repairPersonList = data;
    $scope.clickIndex = 0;

    var repairPersonList = data;
    var firstPerson = repairPersonList[0];
    var personArr = [];
    for (var i = 0; i < repairPersonList.length; i++) {
        var person = repairPersonList[i];
        if (person.xlz == firstPerson.xlz) {
            personArr.push(person);
        }
    }
    $scope.personArr = personArr;

    $scope.chooseXlz = function (itemData, index) {
        $scope.clickIndex = index;
        personArr = [];
        for (var i = 0; i < repairPersonList.length; i++) {
            var person = repairPersonList[i];
            if (person.xlz == itemData.xlz) {
                personArr.push(person);
            }
        }
        $scope.personArr = personArr;
    };
    //在这里处理要进行的操作
    $scope.ok = function () {
        var choosePersonStr = "";
        if (personArr != null && personArr.length != null) {
            for (var i = 0; i < personArr.length; i++) {
                var person = personArr[i];
                if (person.checked) {
                    choosePersonStr += person.xlg + ",";
                }

            }
        }
        if(!choosePersonStr){
            ionicToast.show("您还未选择人员", 'middle', false, 2000);
            return;
        }
        $modalInstance.close(choosePersonStr);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
});