(function() {
	angular.module('QiyeController', ['ui.bootstrap'])
		.controller('qiyemsgCtrl', ['$http','$uibModal','$log','$document',function($http,$uibModal, $log, $document) {
        	console.log("11111");
		}])

        .controller('qiyemsg2Ctrl', ['$http','$uibModal','$log','$document',function($http,$uibModal, $log, $document) {
            console.log("222222");

        }]);
})();
