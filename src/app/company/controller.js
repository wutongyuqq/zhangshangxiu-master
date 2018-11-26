app.controller('CompanyCtrl', ['$http','$uibModal','$log','$scope','$document', 'userTemp','utils',function($http,$uibModal, $log, $scope,$document,userTemp,utils) {
	var selt = this;
    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }

    this.keyword =  "";
    var keyword = utils.getUrlVar('keyword');
    if(keyword){
        selt.keyword = decodeURI(keyword);
    }

	$http.get("/company/filter").success(function (result) {
		console.log(result.data.area);
		var arr1 = [];
		var arr2 = [];
		if(result.code==1){
			for(var i=0;i<result.data.area.length;i++){
				var areaArr = result.data.area;
				if(i<18){
					arr1.push(areaArr[i]);
				}else{
					arr2.push(areaArr[i]);
				}
			}
			selt.areaList = arr1;
			console.log(arr1);
			selt.areaList2 = arr2;
			console.log(arr2);
			var arr1=[];
			var arr2=[];
			var companyQualList= result.data.companyQual;

			if(companyQualList!=null &&companyQualList.length>0){
				for(var i=0;i<companyQualList.length;i++){
					if(i<8){
						arr1.push(companyQualList[i]);
					}else{
						arr2.push(companyQualList[i]);
					}
				}
			}
			selt.companyQualList = arr1;
			selt.companyQualList2 = arr2;
		}
	});

	this.isCity = false;
	this.regisAddress = "";
	this.qualCode = "";
	this.province = "";
	this.city = "";
	this.qual1 = "";
	this.qual2 = "";
	this.qual3 = "";
	this.minCapital = 0;
	this.maxCapital = null;
	this.priceArea = "";
    this.cancelFilter = function () {
        this.regisAddress = "";
        this.qualCode = "";
        this.province = "";
        this.city = "";
        this.qual1 = "";
        this.qual2 = "";
        this.qual3 = "";
        this.minCapital = 0;
        this.maxCapital = null;
        this.priceArea = ""
        selt.setPage();
    };



	//----省市----
	this.clickProvince = function (area) {
		selt.regisAddress = area.name+"||";
		selt.province = area.name;
        this.city = "";
		selt.isCity = true;
		selt.cityList = area.list;
		selt.setPage();
	};
	this.clickCity = function (city) {
		selt.regisAddress = selt.province+"||"+city;
		selt.city = city;
		selt.isCity = true;
		selt.setPage();
	};
	this.cancelArea = function () {
		this.regisAddress = "";
		this.province = "";
		this.city = "";
        this.isCity = false;
		selt.setPage();
	};
    this.cancleEmCity = function () {
        selt.regisAddress = selt.province+"||";
        selt.city="";
        selt.setPage();
    };
    //---省市----end

    //---资质----
	this.clickQual1 = function (qual) {
		selt.qual1 = qual;
		selt.qual2 = "";
		selt.qual3 = "";
		selt.qualCode = qual.code+"||||";
		selt.setPage();
	};
	this.clickQual2 = function (qual2,quel1) {
        selt.qual1 = quel1;
		selt.qual2 = qual2;
        selt.qual3 = "";
		selt.qualCode = quel1.code+"||"+qual2.code+"||";
        $("#bdd_second_menu").hide();
		selt.setPage();
	};
    this.clickQual3 = function (qual3,qual2,quel1) {
        selt.qual1 = quel1;
        selt.qual2 = qual2;
        selt.qual3 = qual3;
        selt.qualCode = quel1.code+"||"+qual2.code+"||"+qual3.code;
        $("#bdd_second_menu").hide();
        selt.setPage();
    };
    this.cancelQUal = function () {
        this.qualCode = "";
        this.qual1 = "";
        this.qual2 = "";
        this.qual3 = "";
        selt.setPage();
    };
    this.cancleEmQTwo = function () {
        selt.qualCode = selt.qual1.code+"||||";
        selt.qual2="";
        selt.qual3="";
        selt.setPage();
    };
    this.cancleEmQThree = function () {
        selt.qualCode = selt.qual1.code+"||"+selt.qual2.code+"||";
        selt.qual3="";
        selt.setPage();
    };
    this.zzList = [];
    this.zzOne = "";
    this.zzTwo = "";
    this.touchStart = function($event,qual2,qual1){
        var elem = $event.target;
        var grandFather = elem.parentNode.parentNode;
        var aArr = grandFather.getElementsByTagName("a");
        for(var i=0;i<aArr.length;i++){
            var aElem = aArr[i];
            aElem.parentNode.style.backgroundColor='#fff';
            aElem.style.color='#000';
        }
        elem.parentNode.style.backgroundColor='#A7BC6D';
        elem.style.color='#fff';
        var off = $($event.target).offset();
        var tocWidth = $($event.target).width();
        console.log(off.top);
        console.log(off.left);
        console.log(tocWidth);

        selt.zzList = qual2.list;
        selt.zzOne = qual1;
        selt.zzTwo = qual2;
        //selt.setPage();
        selt.setPosition(qual2.list,off.left,off.top,tocWidth);
    };
    this.setPosition = function(arr,offX,offY,tocWidth){
        var secondMenu = document.getElementById('bdd_second_menu');
        $('#bdd_second_menu').css('left',(offX + tocWidth +45) + 'px');
        $('#bdd_second_menu').css('top',offY + 'px');
        if(arr!=null && arr.length>0) {
            $('#bdd_second_menu').css('border', '1px solid #ccc');
            $('#bdd_second_menu').show();
        }else{
            //secondMenu.style.display='none';
            $('#bdd_second_menu').hide();
        }
    };
    //----资质---end---

	this.morePro = false;
	this.moreProvince=function(morePro){
	    if(morePro){
            selt.isCity = false;
        }else if(selt.city!=""){
	        selt.isCity = true;
        }
        selt.morePro = !morePro;
	};
	this.moreZz = false;
	this.moreSelectZz=function(moreZz){
		selt.moreZz = !moreZz;
	};











	//----注册资金---
	this.clickCapital = function (min,max) {
	    if(max==null){
            selt.minCapital = min;
            selt.maxCapital = '';
            selt.priceArea = min+"万以上";
        }else{
            selt.minCapital = min;
            selt.maxCapital = max;
            selt.priceArea = min+"-"+max+"万";
        }
		selt.setPage();
	};
	this.clickPrice = function () {
		selt.priceArea = "";
		if(selt.minPrice&&selt.minPrice!=""){
			selt.minCapital = selt.minPrice;
            selt.priceArea = selt.minPrice+"万以上";
		}else{
			selt.minCapital = 0;
		}
		if(selt.maxPrice&&selt.maxPrice!=""){
			selt.maxCapital = selt.maxPrice;
			if(selt.minPrice&&selt.minPrice!=""){
                selt.priceArea = selt.minPrice+"-"+selt.maxPrice+"万";
            }else{
                selt.priceArea = selt.maxPrice+"万以下";
            }

		}else{
			this.maxCapital = null;
		}
		selt.setPage();
	};
	this.canclePrice = function () {
        selt.priceArea = "";
		selt.minPrice="";
		selt.maxPrice="";
        this.minCapital = 0;
        this.maxCapital = null;
		selt.setPage();
	};
    //----注册资金---end




	//--翻页---
    this.companyList = [];
    this.busy = false;
    this.page = 1;
	this.setPage = function () {
        selt.companyList = [];
        selt.busy = false;
        selt.page = 1;
        selt.nextPage();
	};

	this.nextPage = function () {
        if (selt.busy) return;
        selt.busy = true;
        var paramsPage = {
            keyWord:selt.keyword,
            regisAddress:selt.regisAddress,
            qualCode:selt.qualCode,
            minCapital:selt.minCapital,
            maxCapital:selt.maxCapital,
            pageNo:selt.page,
            pageSize:5
        };

        $http.post("/company/query/filter", angular.toJson(paramsPage)).success(function (result) {
            var companyList = result.data;
            if(companyList!=null&&companyList.length>0){
                if(selt.page==result.pageNum){
                    angular.forEach(companyList,function(company){
                        selt.companyList.push(company);
                    });
                    selt.totalCount = result.total;
                    selt.pageSize = result.pageSize;;
                    selt.pageNo = result.pageNum;
                    selt.busy = false;
                    selt.page += 1;
                    setContentHeight(result.data);
                }
            }else{
                selt.totalCount = 0;
			}
        });
    };
	//------------翻页----end



    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };


    //资质要求弹出资质等级后点击空白自动消失
    $(document).on("click",function(e){//js
        var $target = $(e.target);
        if(!($target.parents().andSelf().is("#bdd_second_menu"))){
            $scope.$apply(function(){
                $('#bdd_second_menu').hide();
            });
        }
    });

}]);

function setContentHeight(dataList){
	var bdd_adver_header = document.getElementById("bdd_adver_header");
	if(dataList.length>2){
		bdd_adver_header.style.height="auto";
	}else{
		bdd_adver_header.style.height="500px";
	}

}




