app.controller('ModifyCtrl', ['$http', '$uibModal', '$log', '$scope', '$document', '$interval', 'userTemp', function ($http, $uibModal, $log, $scope, $document, $interval, userTemp) {
    var selt = this;

    selt.mobileRegx = RegExp("^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$");
    selt.pwdRegx = "[a-zA-Z0-9]{8,16}";
    selt.codeRegx = "[0-9]{6}";

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }

    var second = 59;
    var timerHandler;
    selt.isDisable = false;
    selt.description = "获取验证码";

    function checkCode() {
        timerHandler = $interval(function () {
            if (second <= 0) {
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
        if (!RegExp("^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$").test(selt.invitationPhone)) {
            return;
        }
        var params = {
            invitationPhone: selt.invitationPhone,
            type: 2
        };

        $http.post("/authorize/getVerificationCode", angular.toJson(params)).success(function (result) {
            //发生成功
            if (result.code == "1") {
                checkCode();
            } else {
                alert(result.msg);
            }
        });
    }

    /**
     * 修改密码
     */
    this.modify = function (valid) {
        var params = {
            version: "1",
            loginchannel: "1003",
            userphone: selt.invitationPhone,
            userpass: selt.userpass,
            invitationCode: selt.invitationCode
        };
        if (valid) {
            $http.post("/userCenter/updatePassWord", angular.toJson(params)).success(function (result) {
                if (result.code == 0) {
                    alert(result.msg);
                } else {
                    userTemp = null;
                    selt.user = null;
                    sessionStorage.removeItem("X-TOKEN");
                    sessionStorage.removeItem("userTemp");
                    alert(result.msg);
                    window.location.href = "index.html#/login";
                }
            });
        }
    }

}]);