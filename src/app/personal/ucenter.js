app.controller('UcenterCtrl', ['$http','$state','$log','$scope','$document', 'userTemp',function($http,$state, $log, $scope,$document,userTemp) {
    var selt = this;
    
    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
        window.location.href="index.html#/login";
    }


    $http.post("/userCenter/getUserTemp",null).success(function (result) {
        console.log(result.data);
        $scope.ucenter = result.data;
    });


    console.log( $state.current.name);
    this.menu = $state.current.name;
    this.selectMenu = function (menu) {
        selt.menu = menu;
    };






    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };
}]);