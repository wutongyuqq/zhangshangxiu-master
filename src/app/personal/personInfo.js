app.controller('PersonInfoCtrl', ['$http','$uibModal','$log','$scope','$document',function($http,$uibModal, $log, $scope,$document) {
    var selt = this;
    this.visible = false;
    this.name_hide = true;
    this.email_visible = false;
    this.email_hide = true;
    this.toggle = function () {
        selt.visible = !selt.visible;
        selt.name_hide = !selt.name_hide;
    }

    this.toggle_email  = function () {
        selt.email_visible = !selt.email_visible;
        selt.email_hide = !selt.email_hide;
    }

    $http.post("/userCenter/getUserTemp",null).success(function (result) {
        console.log(result);
        selt.user = result.data;
    });

    this.submit = function (type) {
        //修改昵称
        if(type == 1){
            if(selt.user.nickname == null || selt.user.nickname == ''){
                alert("请填写正确的昵称");
                return;
            }
        }else if(type == 2){
            if(selt.user.mailbox== null || selt.user.mailbox == ''){
                alert("请填写正确的邮箱");
                return;
            }
        }
        var params = {
            nickname:selt.user.nickname === null || selt.user.nickname === '' ? null : selt.user.nickname,
            mailbox:selt.user.mailbox === null || selt.user.mailbox === '' ? null : selt.user.mailbox,
            imgurl:selt.user.imgurl === null || selt.user.imgurl === '' ? null : selt.user.imgurl
        };
        console.log(sessionStorage.getItem("X-TOKEN"));
        console.log(params);
        if(type == 1){
            this.visible = false;
            this.name_hide = true;
        }else if(type == 2){
            this.email_visible = false;
            this.email_hide = true;
        }
       $http.post("/userCenter/updateUserTemp",angular.toJson(params)).success(function (result) {
            if(result.code == 1){
                alert("个人信息修改成功");
                $scope.ucenter.nickname = selt.user.nickname;
            }else{
                alert("个人信息修改失败");
            }
        });
    }

    //修改图片信息
    $scope.upload = function(){
        // alert('OK');
        var fd = new FormData();
        var file = document.querySelector('input[type=file]').files[0];
        fd.append("files",file);
        console.log(file);
        $http({
            method:'POST',
            url:"/userCenter/updateHeadPortrait",
            data: fd,
            headers: {'Content-Type':undefined}, transformRequest: angular.identity }) .success( function ( response ) {
                if(response.code == 1){
                    selt.user.imgurl = response.imgPath;
                    selt.updateImgUrl(selt.user.imgurl);
                }else{
                    alert('设置图像失败');
                }
        });
    }
    
    this.updateImgUrl = function (imgUrl) {
        var params = {
            imgurl:imgUrl
        };
        $http.post("/userCenter/updateUserTemp",angular.toJson(params)).success(function (result) {
            if(result.code == 1){
                alert("设置图像成功");
                selt.user.imgurl = imgUrl;
                $scope.ucenter.imgurl = imgUrl;
            }else{
                alert("设置图像失败");
            }
        });
    }
}]);