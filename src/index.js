app.controller('IndexCtrl', ['$http','$scope','$rootScope',function($http,$scope,$rootScope) {

        $scope.busy = true;

    //·�ɼ����¼�
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            $scope.busy = true;
        });
    // stateChangeSuccess  ��ģ�������ɺ󴥷�
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $scope.busy = false;
        $scope.tabShow = true;
    })
    // $stateChangeError  ��ģ����������з�������ʱ����
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        $scope.busy = false;
    })

    /*"start": "json-mock-kuitos -s / --proxy-host 121.43.148.193 --proxy-port 5555"*/


}]);

setTimeout(function(){
    var tabNav =  document.getElementById("tab_nav");
    if(tabNav!=null) {
        tabNav.style.display = "inline-block";
    }
},1000);
setTimeout(function(){
    var tabNav =  document.getElementById("tab_nav");
    if(tabNav!=null) {
        tabNav.style.display = "inline-block";
    }
},3000);
