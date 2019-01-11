//结算收银页面控制器
app.controller('WinBidCtrl', ['$http', '$scope', '$state', 'locals', 'ionicToast', function ($http, $scope, $state, locals, ionicToast) {
    var carInfo = locals.getObject("carInfo");

    $scope.carInfo = carInfo;
    var params = {
        db: locals.get("Data_Source_name"),
        function: "sp_fun_down_poundage"
    };
    var jsToBean = new Object();
    jsToBean.wxFl = 0;
    jsToBean.zfbFl = 0;
    jsToBean.yhkFl = 0;
    $scope.jsToBean = jsToBean;
    $http({
        method: 'post',
        url: '/restful/pro',
        dataType: "json",
        data: angular.toJson(params),
    }).success(function (data, status, headers, config) {
        console.log(data);
        var state = data.state;
        if (state == 'ok') {
            var dataArray = data.data;
            if (dataArray != null && dataArray.length > 0) {
                var jsdBean = jsToBean;
                var selectList = new Array();
                for (var i = 0; i < dataArray.length; i++) {
                    var bean = dataArray[i];
                    if (bean.name == "微信") {
                        jsdBean.wxFl = Number(bean.setup2);
                    } else if (bean.name == "支付宝") {
                        jsdBean.zfbFl = Number(bean.setup2);
                    }
                    if(bean.name!="微信"&&bean.name!="支付宝"){
                        selectList.push(bean);
                    }
                }
                $scope.selectList = selectList;
                jsdBean.yhkFl = Number(selectList[0].setup2);
                $scope.shuaKaStr = selectList[0].setup1;
                jsToBean.yskDkNum = selectList[0].Pre_payment;
                $scope.jsToBean = jsdBean;
            }

        }
    }).error(function (data) {
        ionicToast.show("服务异常", "middle", 2000);
        pre_row_number = 'end';
    });
    var shouyinBean = locals.getObject("shouyinBean");
    $scope.shouyinBean = shouyinBean;
    $scope.isShowAll = false;


    $scope.selectItem=function(item){
        var jsdBean = $scope.jsdBean;
        jsdBean.yhkFl = item.setup2;
        $scope.jsToBean = jsdBean;
        $scope.shuaKaStr = item.setup1;

    }
    $scope.showAllMoney = function () {
        var vipcard_no = Number($scope.vipcard_no?$scope.vipcard_no:"0");
        if(vipcard_no==0){
            ionicToast.show("请输入会员卡卡号", 'middle', false, 2000);
            return;
        }

        var params2 = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_get_vipcard_money",
            vipcard_no: $scope.vipcard_no+""
        }

        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: angular.toJson(params2),
        }).success(function (data, status, headers, config) {
            console.log(data);
            var state = data.state;
            if (state == 'ok') {
                $scope.isShowAll = true;
                $scope.vipcard_money = data.vipcard_money;
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
            pre_row_number = 'end';
        });


    }

    $scope.weifenpeiNum = shouyinBean.ysje;

    $scope.xianjinPay = function () {

        $scope.xianjinNum = Number(shouyinBean.ysje) -
            Number($scope.shuakaNum ? $scope.shuakaNum : '0') -
            Number($scope.zhuanzhangNum ? $scope.zhuanzhangNum : '0') -
            Number($scope.guazhangNum ? $scope.guazhangNum : '0') -
            Number($scope.weixinNum ? $scope.weixinNum : '0') -
            Number($scope.zfbNum ? $scope.zfbNum : '0');
        $scope.weifenpeiNum = 0;
    }
    $scope.goBackPage = function () {

        history.back();
    }


    $scope.shuakaPay = function () {

        $scope.shuakaNum = Number(shouyinBean.ysje) -
            Number($scope.xianjinNum ? $scope.xianjinNum : '0') -
            Number($scope.zhuanzhangNum ? $scope.zhuanzhangNum : '0') -
            Number($scope.guazhangNum ? $scope.guazhangNum : '0') -
            Number($scope.weixinNum ? $scope.weixinNum : '0') -
            Number($scope.zfbNum ? $scope.zfbNum : '0');
        $scope.weifenpeiNum = 0;
    }


    $scope.zhuanzhangPay = function () {

        $scope.zhuanzhangNum = Number(shouyinBean.ysje) -
            Number($scope.xianjinNum ? $scope.xianjinNum : '0') -
            Number($scope.shuakaNum ? $scope.shuakaNum : '0') -
            Number($scope.guazhangNum ? $scope.guazhangNum : '0') -
            Number($scope.weixinNum ? $scope.weixinNum : '0') -
            Number($scope.zfbNum ? $scope.zfbNum : '0');
        $scope.weifenpeiNum = 0;
    }


    $scope.guazhangPay = function () {

        $scope.guazhangNum = Number(shouyinBean.ysje) -
            Number($scope.xianjinNum ? $scope.xianjinNum : '0') -
            Number($scope.shuakaNum ? $scope.shuakaNum : '0') -
            Number($scope.zhuanzhangNum ? $scope.zhuanzhangNum : '0') -
            Number($scope.weixinNum ? $scope.weixinNum : '0') -
            Number($scope.zfbNum ? $scope.zfbNum : '0');
        $scope.weifenpeiNum = 0;
    }

    $scope.weixinPay = function () {

        $scope.weixinNum = Number(shouyinBean.ysje) -
            Number($scope.xianjinNum ? $scope.xianjinNum : '0') -
            Number($scope.shuakaNum ? $scope.shuakaNum : '0') -
            Number($scope.zhuanzhangNum ? $scope.zhuanzhangNum : '0') -
            Number($scope.guazhangNum ? $scope.guazhangNum : '0') -
            Number($scope.zfbNum ? $scope.zfbNum : '0');
        $scope.weifenpeiNum = 0;
    }

    $scope.getWfpMoney = function () {
        $scope.weifenpeiNum = Number(shouyinBean.ysje) -
            Number($scope.xianjinNum ? $scope.xianjinNum : '0') -
            Number($scope.shuakaNum ? $scope.shuakaNum : '0') -
            Number($scope.zhuanzhangNum ? $scope.zhuanzhangNum : '0') -
            Number($scope.guazhangNum ? $scope.guazhangNum : '0') -
            Number($scope.zfbNum ? $scope.zfbNum : '0') - Number($scope.weixinNum ? $scope.weixinNum : '0') ;

    }
    $scope.zfbPay = function () {

        $scope.zfbNum = Number(shouyinBean.ysje) -
            Number($scope.xianjinNum ? $scope.xianjinNum : '0') -
            Number($scope.shuakaNum ? $scope.shuakaNum : '0') -
            Number($scope.zhuanzhangNum ? $scope.zhuanzhangNum : '0') -
            Number($scope.guazhangNum ? $scope.guazhangNum : '0') -
            Number($scope.weixinNum ? $scope.weixinNum : '0');
        $scope.weifenpeiNum = 0;
    }
    var tipJson="";
    $scope.shouYin = function () {
        var carInfo = locals.getObject("carInfo");
        var user = locals.getObject("user");
        var jsd_id = locals.get("jsd_id");
        $scope.carInfo = carInfo;

        var checkNum =0;

        var ysje;

        var sxf;
        var ssje;
        var skfs='';
        var skfs1='';
        var sxf1;
        var skje1;


        var skfs2='';
        var sxf2;
        var skje2;

        var Pre_payment = $scope.shouyinBean.Pre_payment;//预收金额
        var xianjinNum = $scope.xianjinNum?Number($scope.xianjinNum):0;//现金
        var shuakaNum = $scope.shuakaNum?Number($scope.shuakaNum):0;//刷卡
        var zhuanzhangNum = $scope.zhuanzhangNum?Number($scope.zhuanzhangNum):0;//转账
        var kcVipMoney = $scope.kcVipMoney?Number($scope.kcVipMoney):0;//扣除会员卡
        var guazhangNum = $scope.guazhangNum?Number($scope.guazhangNum):0;//挂账
        var weixinNum = $scope.weixinNum?Number($scope.weixinNum):0;//微信
        var zfbNum = $scope.zfbNum?Number($scope.zfbNum):0;//支付宝
        var yhkFl = (Number)($scope.jsToBean&&$scope.jsToBean.yhkFl?((Number)($scope.jsToBean.yhkFl)):0);//银行卡费率
        var yskDkNum = $scope.jsToBean.yskDkNum?Number($scope.jsToBean.yskDkNum):0;//预收款抵扣
        var bit_compute = $scope.shouyinBean.bit_compute?Number($scope.shouyinBean.bit_compute):0;//养车币
        var wxFl = $scope.jsToBean.wxFl?Number($scope.jsToBean.wxFl):0;//微信费率
        var zfbFl = $scope.jsToBean.zfbFl?Number($scope.jsToBean.zfbFl):0;//支付宝费率
        var yhje=Number($scope.shouyinBean.yhje?$scope.shouyinBean.yhje:'0');//优惠金额

        var ysje=Number($scope.shouyinBean.ysje ? shouyinBean.ysje : "0");
        var kcYcb=Number($scope.kcYcb ? $scope.kcYcb : "0");
        var vipcard_no=$scope.vipcard_no ? $scope.vipcard_no : ""

        //付款方式数组
        var moneyDescArr = ['消费卡','现金','刷卡','转账','挂账','微信','支付宝','预收款','养车币'];
        //付款金额数组
        var moneyArr =[kcVipMoney,xianjinNum,shuakaNum,zhuanzhangNum,guazhangNum,weixinNum,zfbNum,yskDkNum,kcYcb];
        //付款金额对应手续费
        var moneySxf = [0,0,shuakaNum*yhkFl,0,0,weixinNum*wxFl,zfbNum*zfbFl,0,0];
        //结算数组初始化
        var newMoneyArr = new Array();

        var moneyTotal = 0;
        var sxfTotal = 0;
        for(var i=0;i<moneyArr.length;i++){
            var moneyNum = Number(moneyArr[i]?moneyArr[i]:0);
            if(moneyNum>0) {//如果金额大于0，则填充到结算数组中
                var moneyBean = new Object();
                moneyBean.money = moneyArr[i];
                moneyBean.sxf = Number(moneySxf[i]).toFixed(2);
                moneyBean.moneyDesc = moneyDescArr[i];
                if(moneyDescArr[i]=="刷卡"){//如果付款方式是刷卡，则更换为具体的银行名称
                    moneyBean.moneyDesc = $scope.shuaKaStr;
                }

                moneyTotal+=moneyArr[i];//计算各项付款方式金额的总和
                sxfTotal+=moneySxf[i];//计算各项手续费总和
                newMoneyArr.push(moneyBean);//将对象push到结算数组中
            }
        }
        //超过三种方式，提示重新选择
        if(newMoneyArr.length>3){
            ionicToast.show("结算方式超过3种，请重新选择", 'middle', false, 5000);
            return;
        }else if(newMoneyArr.length==0){//如果没有填写金额，提示重新选择
            ionicToast.show("您还未填写付款金额", 'middle', false, 5000);
            return;
        }
        if(moneyTotal.toFixed(0)<(ysje-yhje).toFixed(0)){//如果金额不正确，提示重新选择
            ionicToast.show("您填写的金额不正确", 'middle', false, 5000);
            return;
        }

        if(newMoneyArr!=null && newMoneyArr.length>0){
            //如果是三种付款方式，则按先后顺序赋值
            if(newMoneyArr.length>2){
                skfs = newMoneyArr[0].moneyDesc;
                ysje = newMoneyArr[0].money;
                ssje = newMoneyArr[0].money - yhje - newMoneyArr[0].sxf;
                sxf = newMoneyArr[0].sxf;

                skfs1= newMoneyArr[1].moneyDesc;
                skje1 =  newMoneyArr[1].money;
                sxf1= newMoneyArr[1].sxf;

                skfs2= newMoneyArr[2].moneyDesc;
                skje2 =  newMoneyArr[2].money;
                sxf2=newMoneyArr[2].sxf;

            }else if(newMoneyArr.length==2){ //如果是两种付款方式，则按先后顺序赋值，第三个赋值为0
                skfs = newMoneyArr[0].moneyDesc;
                ysje = newMoneyArr[0].money;
                ssje = newMoneyArr[0].money - yhje - newMoneyArr[0].sxf;
                sxf = newMoneyArr[0].sxf;

                skfs1= newMoneyArr[1].moneyDesc;
                skje1 =  newMoneyArr[1].money;
                sxf1=newMoneyArr[1].sxf;

                skfs2= 0;
                skje2 =  0;
                sxf2=0;
            }else if(newMoneyArr.length==1){ //如果是两种付款方式，则按先后顺序赋值，第三个赋值为0
                skfs = newMoneyArr[0].moneyDesc;
                ysje = newMoneyArr[0].money;
                ssje = newMoneyArr[0].money - yhje - newMoneyArr[0].sxf;
                sxf = newMoneyArr[0].sxf;
                skfs1= 0;
                skje1 =  0;
                sxf1=0;
                skfs2=0;
                skje2 =  0;
                sxf2=0;
            }else if(newMoneyArr.length==0){
                ionicToast.show("请未填写付款方式或付款金额", 'middle', false, 2000);
                return;
            }
        }
       var shouyinCar = locals.getObject("shouyinCar");
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_upload_receivables_data",
            company_code: user.company_code,
            customer_id: shouyinCar.customer_id,
            plate_number:  shouyinCar.cp,
            jsd_id: jsd_id,
            czy: user.userName,
            ysje: ysje ? ysje + "" : '0',
            yhje: yhje ? yhje + "" : '0',
            sxf: sxf ? sxf + "" : '0',
            ssje: ssje ? ssje + "" : '0',
            skfs: skfs,
            bit_compute: bit_compute ? bit_compute + "" : '0',
            bit_use: shouyinBean.bit_use ? shouyinBean.bit_use + "" : '0',
            skfs1: skfs1,
            skje1: skje1 ? skje1 + "" : '0',
            sxf1: sxf1 ? sxf1 + "" : '0',
            skfs2: skfs2 ? skfs2 + "" : '0',
            skje2:skje2 ?skje2 + "" : '0',
            sxf2: sxf2 ? sxf2 + "" : '0',
            pre_payment: $scope.shouyinBean.Pre_payment+"",
            vipcard_no: vipcard_no
        };
        var jsonToRes = angular.toJson(params);
        tipJson = jsonToRes;
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonToRes
        }).success(function (data, status, headers, config) {
            console.log(data);
            var state = data.state;
            if (state == 'ok') {
                ionicToast.show("提交成功"+tipJson, 'middle', false, 5000);
                $state.go("Winbding");
            } else {
                ionicToast.show("错误：" + data.msg+"  "+tipJson, 'middle', false, 5000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常"+tipJson, "middle", 5000);
            pre_row_number = 'end';
        });
    }

}]);

//打印数据页面
app.controller('WinTotalCtrl', ['$http', '$scope', '$state', 'locals', 'ionicToast', function ($http, $scope, $state, locals, ionicToast) {
    var carInfo = locals.getObject("carInfo");
    var user = locals.getObject("user");
    $scope.factoryName = user.factoryName;
    var jsd_id = locals.get("jsd_id");
    var ticheTime = locals.get("ticheTime");
    $scope.carInfo = carInfo;
    $scope.jsd_id = jsd_id;
    $scope.ticheTime = ticheTime;
    var jsdInfo = new Object();
    $scope.syType == 0;
    $scope.getBaseData = function () {
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_repair_list_main",
            jsd_id: jsd_id
        };
        var jsonStr = angular.toJson(params);
        var gdData = new Object();
        $scope.gdData = gdData;
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr
        }).success(function (data, status, headers, config) {
            console.log(data);
            var state = data.state;
            if (state == 'ok') {
                var gdDataList = data.data;
                if (gdDataList != null && gdDataList.length > 0) {
                    gdData = gdDataList[0];
                    jsdInfo = gdData;
                    $scope.gdData = gdData;
                    var carInfo = locals.getObject("carInfo");
                    carInfo.customer_id = gdData.customer_id;
                    locals.setObject("carInfo",carInfo);
                    locals.setObject("shouyinCar",gdData);


                }
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
            pre_row_number = 'end';
        });

    }
    $scope.getBaseData();

    $scope.pjDataList = new Array();
    var totalCb = 0;
    var jsdInfo = new Object();
    $scope.getPjListData = function () {
        var params2 = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_jsdmx_pjclmx",
            jsd_id: jsd_id
        };
        var jsonStr2 = angular.toJson(params2);
        var pjData = new Object();
        $scope.pjData = pjData;
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr2
        }).success(function (data, status, headers, config) {
            console.log(data);
            var state = data.state;
            if (state == 'ok') {
                var gdDataList = data.data;
                if (gdDataList != null && gdDataList.length > 0) {
                    $scope.pjDataList = gdDataList;
                    if (gdDataList != null && gdDataList.length > 0) {
                        var totalsl = 0;
                        var totalMoney = 0;
                        for (var i = 0; i < gdDataList.length; i++) {
                            var bean = gdDataList[i];
                            totalsl += Number(bean.sl);
                            totalMoney += Number(bean.ssj) * Number(bean.sl);
                            totalCb += Number(bean.cb);
                        }
                        $scope.totalsl = totalsl;
                        $scope.totalMoney = totalMoney;
                    }
                }
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
            pre_row_number = 'end';
        });
    }
    $scope.getPjListData();
    $scope.getProjListData = function () {
        var params2 = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_jsdmx_xlxm",
            jsd_id: jsd_id
        };
        var jsonStr3 = angular.toJson(params2);
        var pjData = new Object();
        $scope.pjData = pjData;
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr3
        }).success(function (data, status, headers, config) {
            console.log(data);
            var state = data.state;
            if (state == 'ok') {
                var gdDataList = data.data;
                if (gdDataList != null && gdDataList.length > 0) {
                    $scope.xmDataList = gdDataList;
                    if (gdDataList != null && gdDataList.length > 0) {
                        var totalXlf = 0;
                        var totalZk = 0;
                        for (var i = 0; i < gdDataList.length; i++) {
                            var bean = gdDataList[i];
                            totalXlf += Number(bean.xlf);
                            totalZk += Number(bean.zk);
                        }
                        $scope.totalXlf = totalXlf;
                        $scope.totalZk = totalZk;
                    }

                }
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
            pre_row_number = 'end';
        });
    }
    $scope.getProjListData();

    $scope.goBackPage = function () {
        history.back();
    }


    $scope.getCompanyData = function () {
        var params2 = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_get_company_info",
            company_code: user.company_code
        };
        var jsonStr3 = angular.toJson(params2);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr3
        }).success(function (data, status, headers, config) {
            console.log(data);
            var state = data.state;
            if (state == 'ok') {
                var dataList = data.data;
                if (dataList != null && dataList.length > 0) {
                    var dataBean = dataList[0];
                    $scope.company_name = dataBean.company_name;
                    $scope.telphone = dataBean.telphone;
                    $scope.address = dataBean.address;
                }

            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
            pre_row_number = 'end';
        });


    }
    $scope.getCompanyData();


    $scope.getDataInfo = function () {
        var jsd_id = locals.get("jsd_id");
        $scope.jsd_id = jsd_id;
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_down_repair_list_main",
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
                var gdDataList = data.data;
                if (gdDataList != null && gdDataList.length > 0) {
                    carInfo = $scope.carInfo;
                    gdData = gdDataList[0];
                    var carToInfo = gdData;
                    var jcDataStr = gdData.ywg_date;
                    if (jcDataStr.length > 10) {
                        jcDataStr = jcDataStr.substring(0, 10);
                    }
                    $scope.ticheTime = jcDataStr;
                    $scope.memo = gdData.memo;//备注
                    $scope.cx = gdData.cx;//备注
                    $scope.car_fault = gdData.car_fault;//备注

                }

            }
        });

    }


    $scope.getDataInfo();
    $scope.getDateTime = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = (now.getMonth() + 1).toString();
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
        var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        return dateTime;

    }

    $scope.dyTime = $scope.getDateTime();
    $scope.toJieSuanDetail = function () {
        //totalXlf+totalMoney
        if ($scope.gdData.djzt == '审核已结算') {
            return;
        }

        if (Number(jsdInfo.clcb) != totalCb ||
            Number(jsdInfo.clfzj) != Number($scope.totalMoney) ||
            Number(jsdInfo.wxfzj) != Number($scope.totalXlf) ||
            (Number($scope.totalMoney) + Number(jsdInfo.totalXlf)) != Number(jsdInfo.zje)) {

            $scope.judgeIsSendData();
        } else {
            $scope.uploadMoney();
        }


    }


    $scope.judgeIsSendData = function () {
        var jsd_id = locals.get("jsd_id");
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_update_repair_main_money",
            jsd_id: jsd_id,
            zje: Number($scope.totalXlf == null ? '0' : $scope.totalXlf) + Number($scope.totalMoney == null ? '0' : $scope.totalMoney) + '',
            wxfzj: $scope.totalXlf == null ? '0' : $scope.totalXlf,
            clfzj: $scope.totalMoney == null ? '0' : $scope.totalMoney,
            clcb: totalCb == null ? '0' : totalCb.toFixed(2) + ''

        }
        var jsonStr8 = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr8
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == 'ok') {
                $scope.uploadMoney();
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });
    }

    $scope.uploadMoney = function () {
        var jsd_id = locals.get("jsd_id");
        var params = {
            db: locals.get("Data_Source_name"),
            function: "sp_fun_get_settle_accounts_info",
            jsd_id: jsd_id
        }
        var jsonStr8 = angular.toJson(params);
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: jsonStr8
        }).success(function (data, status, headers, config) {
            var state = data.state;
            if (state == 'ok') {
                var shouyinBean = new Object();
                var dataArray = data.data;
                var dataBean = dataArray[0];
                shouyinBean.ysje = Number($scope.totalXlf + $scope.totalMoney);
                shouyinBean.yhje = Number($scope.totalZk);
                shouyinBean.bit_compute = Number(dataBean.bit_compute);
                shouyinBean.bit_use = Number(dataBean.bit_amount);
                shouyinBean.ysje = Number(dataBean.zje);
                shouyinBean.Pre_payment = Number(dataBean.Pre_payment);
                locals.setObject("shouyinBean", shouyinBean);
                $state.go("WinBid");
            } else {
                ionicToast.show("错误：" + data.msg ? data.msg : "", 'middle', false, 2000);
            }
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });

    }
    $scope.guid = function(){
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    $scope.printOne = function(){
        /*var timestamp = (Date.parse(new Date()))/1000;
        var params = {
            client_id:'25972',    //string	开发者的应用ID，在开放平台创建应用时获得
            access_token:'a90188b91d2b34fb00c0b3c6473160f6',     //string	授权的token 必要参数
            machine_code:'4004564459',     //string	易联云打印机终端号
            content:'易佳软件测试',     //string	打印内容(需要urlencode)，排版指令详见打印机指令
            origin_id:'20180613202300',    // string	商户系统内部订单号，要求32个字符内，只能是数字、大小写字母 ，且在同一个client_id下唯一。详见商户订单号
            sign :'1056180385',    //string	签名 详见API文档列表-接口签名
            id:'',     //string	UUID4 详见API文档列表-uuid4
            timestamp:timestamp   //	int	当前服务器时间戳(10位)
        }



        $http({
            method:'post',
            url:'https://open-api.10ss.net/print/index',
            data:params
        }).success(function(req){
            console.log(req);
        }).error(function (data) {
            ionicToast.show("服务异常", "middle", 2000);
        });*/

        var params={
            jsd_id:$scope.jsd_id,
            ticheTime:$scope.ticheTime?$scope.ticheTime:"",
            company_name:$scope.company_name?$scope.company_name:"",
            cz:$scope.gdData.cz?$scope.gdData.cz:"",
            cp:$scope.gdData.cp?$scope.gdData.cp:"",
            cjhm:$scope.gdData.cjhm?$scope.gdData.cjhm:"",
            cx:$scope.gdData.cx?$scope.gdData.cx:"",
            jclc:$scope.gdData.jclc?$scope.gdData.jclc:"",
            car_fault:$scope.car_fault?$scope.car_fault:"",
            totalsl:$scope.totalsl?$scope.totalsl:"0",
            totalMoney:$scope.totalMoney?$scope.totalMoney:"0",
            yszje:($scope.totalXlf+$scope.totalMoney)?(($scope.totalXlf+$scope.totalMoney)+""):"0",
            address:$scope.address?$scope.address:"",
            telphone:$scope.telphone?$scope.telphone:"",
            jc_date:$scope.gdData.jc_date?$scope.gdData.jc_date:"",
            memo:$scope.gdData.memo?$scope.gdData.memo:"",
            dyTime:$scope.dyTime?$scope.dyTime:"",
            totalXlf:$scope.totalXlf?$scope.totalXlf:""
        }

        var xmListJson=angular.toJson($scope.xmDataList?$scope.xmDataList:new Array());
        var pjDataListJson=angular.toJson($scope.pjDataList?$scope.pjDataList:new Array);
        var paramsJSON=angular.toJson(params);

        window.printdata.print(paramsJSON,xmListJson,pjDataListJson);



        /*var contentStr = encodeURI("首佳测试");

        var client_id="25972";//用户id
        var access_token="a90188b91d2b34fb00c0b3c6473160f6";//用户id
        var machine_code="4004564459";//打印机终端号
        var origin_id = "2018061320"+(Math.random()*1000)/1;
        var timestamp =(Date.parse(new Date()))/1000;
        var id=$scope.guid();
        var sign=md5(client_id+timestamp+access_token);//用户id

        var params = {
            client_id:client_id,
            access_token:access_token,
            machine_code:machine_code,
            origin_id:origin_id,
            timestamp:timestamp,
            id:id,
            sign:sign,
            content:contentStr
        }*/

        /*    $.post("https://open-api.10ss.net/print/index",params,function(result){
         console.log(result)
         });*/



    }

    /**
     * 登录
     */
    $scope.getDataToClient = function () {
        var user = locals.getObject("user");
        var params = {
            db: "sjsoft_SQL",
            function: "sp_fun_check_service_validity",
            data_source: user.factoryName,
            operater_code: user.userName
        };
        $http({
            method: 'post',
            url: '/restful/pro',
            dataType: "json",
            data: angular.toJson(params),
        }).success(function (data, status, headers, config) {
            if (state == 'true') {
                window.printdata.saveDataForLogin(user.factoryName, data.machine_code, data.machine_key);
            }
        });
    }
    $scope.getDataToClient();
}]);







