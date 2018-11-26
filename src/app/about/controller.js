app.controller('AboutCtrl', ['$interval',function($interval) {

	var selt = this;

	this.title = 'About Title';
	this.content = 'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.';

	this.alert = function() {
		window.alert('我只是一个弹出框');
	};
	this.paracont = "获取验证码";
	this.paraclass = "but_null";
	this.paraevent = true;
	var second = 60,
		timePromise = undefined;

	timePromise = $interval(function(){
		if(second<=0){
			$interval.cancel(timePromise);
			timePromise = undefined;

			second = 60;
			selt.paracont = "重发验证码";
			selt.paraclass = "but_null";
			selt.paraevent = true;
		}else{
			selt.paracont = second + "秒后可重发";
			selt.paraclass = "not but_null";
			second--;

		}
	},1000,100);
}]);