app.controller('IndexCtrl', ['$http','$scope','ionicToast',function($http, $scope,ionicToast) {
	$scope.ipAddress = "http://121.43.148.193:5555";

}]);

app.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
	var $ctrl = this;
	$ctrl.items = items;
	$ctrl.selected = {
		item: $ctrl.items[0]
	};

	$ctrl.ok = function () {
		$uibModalInstance.close($ctrl.selected.item);
		//window.location.reload();
	};

	$ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
