// app.controller('RegisterCtrl', ['$http', '$log', '$scope', '$document', function ($http, $uibModal, $log, $scope, $document) {
app.controller('RegisterCtrl', ['$http', '$log', '$scope', '$interval', '$document', function ($http, $log, $scope, $interval, $document) {
    var selt = this;

    var second = 59;
    var timerHandler;
    selt.isDisable = false;
    selt.description = "获取验证码";

    function checkCode(){
        timerHandler = $interval(function () {
           if(second <= 0) {
               $interval.cancel(timerHandler);
               second = 59;
               selt.isDisable = false;
               selt.description = "获取验证码";
           } else {
               selt.description = second + "秒后重发";
               second--;
               selt.isDisable = true;
           }
        }, 1000, 100);
    }

    /**
     * 发验证码
     */
    this.sendVerCode = function () {
        var params = {
            invitationPhone: selt.invitationPhone,
            type: 1
        };

        $http.post("/authorize/getVerificationCode", angular.toJson(params)).success(function (result) {
            //发生成功
            if (result.code == "1") {
                checkCode();
            } else {
                checkCode();
                alert(result.msg);
            }
        });
    }

    /**
     * 注册
     */
    this.bindPhone = function () {
        var params = {
            version: "0",
            loginchannel: "1003",
            username: selt.invitationPhone,
            userphone: selt.invitationPhone,
            userpass: selt.userpass,
            invitationCode: selt.invitationCode
        };

        $http.post("/authorize/thirdPartyBindingOrRegister", angular.toJson(params)).success(function (result) {
            if (result.code == 0) {
                alert(result.msg);
            } else {
                sessionStorage.setItem("X-TOKEN", result.data.xtoken);
                window.location.href = "index.html#/home";
            }
        });
    }

}]);