app.controller('CompanyDetailCtrl', ['$http','$scope','utils','userTemp','$anchorScroll',"$location",function($http,$scope, utils,userTemp,$anchorScroll,$location) {

    $scope.goBackPage=function(){
        history.back()
    }

}]);


