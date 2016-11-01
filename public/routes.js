myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'login/login.html',
			controller: 'loginController'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'signup/signup.html',
			controller: 'signupController'
		})
		.state('home', {
			url: '/home',
			templateUrl: '/home/home.html',
			controller: 'homeController'
		});

}]);