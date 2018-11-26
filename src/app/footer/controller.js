app.controller('FooterCtrl', ['$http', '$log', '$scope', '$interval', '$document', function ($http, $log, $scope, $interval, $document) {
    var selt = this;
    /**
     * 全部收起
     * @type {boolean}
     */


    this.list = [];

    for(var i=0;i<11;i++){
        var item = {
            id:i,
            boo:false
        };
        selt.list.push(item);
    }

    this.showDetail = function (id) {
        angular.forEach(selt.list,function(item){
            if(item.id == id){
                item.boo = !item.boo ;
            }
        });
    };

}]);