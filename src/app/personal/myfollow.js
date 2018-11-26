app.controller('MyfollowCtrl', ['$http','$uibModal','$log','$scope','$document',function($http,$uibModal, $log, $scope,$document) {
    var selt = this;

    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    this.clearAllList =function(){
        selt.biddingList=null;
        selt.tenderList=null;
        selt.companyList = null;
        selt.param.pageNo=1;
    }

    this.reset = function(type){
        selt.choiceCompanyList=false;
        selt.param.type=null;
        selt.resultLength=0;
        selt.returnPageNum=0;
        selt.noResultList=null;
    }

    this.resultLength=0;

    //公共参数对象
    this.param = {
        pageNo: 1,
        pageSize: 5,
        type:'0'
    };
    this.choiceCompanyList=false;

    this.showTailInfo =function (listData,length){
        if(!listData ){
            selt.noResultList="无关注列表，快去增加关注信息把。";
        }else{
            selt.noResultList=null;
        }
    };

    this.loading = function () {
        if (selt.busy==true) {
            alert("数据加载中，切换太频繁。。。");
            return true;
        } else {
            selt.info = "正在加载中..."
            selt.noResultList = null;
            selt.busy = true;
            return false;
        }
    }

    //查询收藏公告
    this.queryCollNoticeList = function (type) {
        if(selt.loading()){
            return ;
        }
        selt.reset(type);
        selt.param.type=type;
        console.log(this.param);
        $http.post("/userCenter/listCollectionNotice", angular.toJson(this.param)).success(function (result) {
            console.log("##result.pageNum："+result.pageNum);
            console.log(result);
            selt.resultLength=result.data.length;
            selt.returnPageNum=result.pageNum;
            if(selt.returnPageNum!=selt.param.pageNo){//翻页时当前页没有记录，后端也会返回上一页记录。防止继续翻页
                selt.resultLength=-1;
                if (selt.param.type == 0) {
                    selt.showTailInfo(selt.tenderList, selt.resultLength);
                } else if (selt.param.type == 2) {
                    selt.showTailInfo(selt.biddingList, selt.resultLength);
                }
            }else {
                if (selt.param.type == 0) {
                    if (selt.tenderList) {
                        selt.tenderList = selt.tenderList.concat(result.data);
                    } else {
                        selt.tenderList = result.data;
                    }
                    selt.showTailInfo(selt.tenderList, result.data.length);
                } else if (selt.param.type == 2) {
                    if (selt.biddingList) {
                        selt.biddingList = selt.biddingList.concat(result.data);
                    } else {
                        selt.biddingList = result.data;
                    }
                    selt.showTailInfo(selt.biddingList, result.data.length);
                }
            }
            selt.turnPageFinished();
        }).error(function (data){
            console.log(data);
            alert(data);
            selt.turnPageFinished();
        });
    };


    //查询收藏企业
    this.queryCollComList = function () {
        if(selt.loading()){
            return ;
        }
        selt.reset();
        selt.choiceCompanyList=true;
        console.log(this.param);
        $http.post("/userCenter/listCollectionCompany", angular.toJson(this.param)).success(function (result) {
            console.log("##result.pageNum："+result.pageNum);
            console.log(result);

            selt.resultLength = result.data.length;
            selt.returnPageNum =result.pageNum;
            if (selt.companyList) {
                selt.companyList = selt.companyList.concat(result.data);
            } else {
                selt.companyList = result.data;
            }
            selt.showTailInfo(selt.companyList, result.data.length);
            selt.turnPageFinished();
        }).error(function (data){
            console.log(data);
            alert(data);
            selt.turnPageFinished();
        });
    };



    this.cancelCollectionNotice = function (noticeid,type,obj){
        var cancelParam = {noticeid:noticeid};
        $http.post("/userCenter/cancelCollectionNotice", angular.toJson(cancelParam)).success(function (result) {
            console.log(result);
            if(result.code==1){//取消成功
                alert("取消关注成功");
                if(type == 2){
                    selt.biddingList.remove(obj);
                }else if(type == 0){
                    selt.tenderList.remove(obj);
                }
            }else{
                alert(result.msg);
            }
        }).error(function (data){
            console.log(data);
            alert(data);
        });
    };

    this.cancelCollectionCompany = function (companyid,obj){
        var cancelParam = {companyid:companyid};
        $http.post("/userCenter/cancelCollectionCompany", angular.toJson(cancelParam)).success(function (result) {
            console.log(result);
            if(result.code==1){//取消成功
                alert("取消关注成功");
                selt.companyList.remove(obj);
            }else{
                alert(result.msg);
            }
        });
    };

    selt.nextPageBusy=false;
    this.nextPage =function (){
        console.log('selt.resultLength:'+selt.resultLength);
        if (selt.busy || selt.nextPageBusy){
            return;
        }
        console.log( selt.nextPageBusy+'@@@@selt.param.pageNo:' + selt.param.pageNo + "##selt.returnPageNum:" + selt.returnPageNum);
        selt.nextPageBusy=true;

        if (selt.param.pageNo == selt.returnPageNum) {
            selt.param.pageNo += 1;
            if (this.param.type) {
                selt.queryCollNoticeList(this.param.type);
            } else {
                selt.queryCollComList();
            }
            // this.turnPageFinished();
        } else {
            if (!selt.noResultList || selt.noResultList == null) {
                selt.noResultList = "没有更多数据了，已经到底了！"
            }
        }
    };

    this.turnPageFinished = function (){
        selt.busy = false;
        selt.info=null;
        selt.nextPageBusy=false;
    };

    //页面初始化
    this.queryCollNoticeList('0');

}]);