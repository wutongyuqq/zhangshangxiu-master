app.controller('IndexCtrl', ['$http','$scope','$rootScope',function($http,$scope,$rootScope) {

        $scope.busy = true;

    //路由监听事件
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            $scope.busy = true;
        });
    // stateChangeSuccess  当模板解析完成后触发
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $scope.busy = false;
    })
    // $stateChangeError  当模板解析过程中发生错误时触发
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        $scope.busy = false;
    })

    /*"start": "json-mock-kuitos -s / --proxy-host 121.43.148.193 --proxy-port 5555"*/
}]);
