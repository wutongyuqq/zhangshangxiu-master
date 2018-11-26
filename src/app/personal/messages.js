app.controller('MessagesCtrl', ['$http', '$uibModal', '$log', '$scope', '$document', 'userTemp', function ($http, $uibModal, $log, $scope, $document, userTemp) {
    var selt = this;


    this.getMessage = function (isSystem) {
        selt.isSystem = isSystem;
        selt.setPage();
    };

    this.messageList = [];
    this.busy = false;
    this.page = 1;
    this.setPage = function () {
        selt.messageList = [];
        selt.busy = false;
        selt.page = 1;
        selt.nextPage();
    };

    this.nextPage = function () {
        if (selt.busy) return;
        selt.busy = true;
        var paramsPage = {
            pageNo: selt.page,
            pageSize: 5,
            isSystem: selt.isSystem
        };

        console.log(selt.page);

        $http.post("/userCenter/listMessageByUserId", angular.toJson(paramsPage)).success(function (result) {
            var messageList = result.data;
            console.log(messageList);
            if (messageList != null && selt.page == result.pageNum) {
                angular.forEach(messageList, function (msg) {
                    selt.messageList.push(msg);
                });
                selt.totalCount = result.total;
                selt.pageSize = result.pageSize;
                ;
                selt.pageNo = result.pageNum;
                selt.busy = false;
                selt.page += 1;
            }
        });
    }

    this.setContentHeight = function (dataList) {
        var bdd_adver_header = document.getElementById("bdd_adver_header");
        if (dataList.length > 2) {
            bdd_adver_header.style.height = "auto";
        } else {
            bdd_adver_header.style.height = "500px";
        }

    };

//页面初始化请求
    this.getMessage(0);
}])
;