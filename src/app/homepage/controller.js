app.controller('HomePageCtrl', ['$http', '$uibModal', '$log', '$scope', '$state', function ($http, $uibModal, $log, $scope, $state) {

    $('#identifier').carousel({
        interval: 2000
    })
    $scope.myInterval = 500;
    $scope.noWrapSlides = false;

    var slides  = [
        {
            image: '../../../vendor/images/banner_1.png',
            text: '1'
        },
        {
            image: '../../../vendor/images/banner_2.png',
            text: '2'
        }, {
            image: '../../../vendor/images/banner_3.png',
            text: '3'
        }, {
            image: '../../../vendor/images/banner_4.png',
            text: '4'
        }];


    $scope.slides = slides;
}]);
