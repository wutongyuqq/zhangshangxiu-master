app.controller('PersonCtrl', ['$http', '$uibModal', '$log', '$scope', '$document', 'userTemp', 'utils', function ($http, $uibModal, $log, $scope, $document, userTemp, utils) {
    var selt = this;

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }

    this.flag = "";
    this.category = "";

    /**
     * 人员证书
     */
    $http.post("/company/personCategory/0").success(function (result) {
        console.log(result.data);
        var arr1 = [];
        var arr2 = [];
        if (result.code == 1) {
            for (var i = 0; i < result.data.length; i++) {
                var bookArr = result.data;
                if (i < 6) {
                    arr1.push(bookArr[i]);
                } else {
                    arr2.push(bookArr[i]);
                }
            }
            selt.bookList = arr1;
            console.log(arr1);
            selt.bookList2 = arr2;
            console.log(arr2);
        }
    });

    /**
     * 全部
     */
    this.cancelCategory = function () {
        this.flag = "";
        this.category = "";
        selt.setPage();
    };

    this.keyword =  "";
    var keyword = utils.getUrlVar('keyword');
    if(keyword){
        selt.keyword = decodeURI(keyword);
    }

    /**
     * 点击证书事件
     * @param book
     */
    this.clickBook = function (book) {
        selt.flag = book.category;
        selt.category = book.category;
        selt.setPage();
    }

    this.personList = [];
    this.busy = false;
    this.page = 1;
    this.setPage = function () {
        selt.personList = [];
        selt.busy = false;
        selt.page = 1;
        selt.nextPage();
    };

    this.nextPage = function () {
        console.log(selt.category);

        if (selt.busy) return;
        selt.busy = true;
        var paramsPage = {
            pageNo: selt.page,
            pageSize: 6,
            keyWord: "",
            category: selt.category,
            keyWord:selt.keyword
        };

        $http.post("/company/person", angular.toJson(paramsPage)).success(function (result) {
            var personList = result.data;
            if (personList != null &&
                selt.page == result.pageNum) {
                angular.forEach(personList, function (person) {
                    selt.personList.push(person);
                });
                selt.personSize = result.total;
                selt.pageSize = result.pageSize;
                selt.pageNo = result.pageNum;
                selt.busy = false;
                selt.page += 1;
            }
        });
    };

    this.setContentHeight = function (dataList) {
        var bdd_adver_header = document.getElementById("bdd_adver_header");
        if (dataList.length > 2) {
            bdd_adver_header.style.height = "auto";
        } else {
            bdd_adver_header.style.height = "500px";
        }

    };

    /**
     * 全部收起
     * @type {boolean}
     */
    this.moreZs = false;
    this.moreSelectZs = function (moreZs) {
        selt.moreZs = !moreZs;
    };

    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };
}]);