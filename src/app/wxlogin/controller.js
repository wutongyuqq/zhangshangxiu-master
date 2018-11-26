app.controller('LoginCtrl', ['$http','$log','$scope','$document', 'username',function($http,$uibModal, $log, $scope,$document, username) {
	var selt = this;

	/**
	 * 登录
	 */
	this.login = function() {
		var params = {
			version:"0",
			loginchannel:"1003",
			username:selt.username,
			userpass:selt.userpass
		};
		//console.log(params);

		$http.post("/authorize/userLogin",angular.toJson(params)).success(function(result)
		{
			if (result.code == 0) {
				alert(result.msg);
			}else{
				username = result.data.username;
				sessionStorage.setItem("X-TOKEN", result.data.xtoken);
				sessionStorage.setItem("username", result.data.username);
				window.location.href="index.html#/home";
			}
		});
	}

}]);
