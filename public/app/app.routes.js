angular.module('appRoutes', ['ui.router', 'ngCookies'])
	.config(function ($stateProvider, $urlRouterProvider) {

		// $urlRouterProvider.otherwise(function ($injector, $location) {
		// 	var rs = $injector.get("$rootScope");
		// 	return "/recordings";
		// })
		$urlRouterProvider.otherwise('/dashboard');

		$stateProvider
			.state('login', {
				url: "/login",
				templateUrl: 'app/views/pages/login.html',
				controller: 'LoginController'
			})
			.state('dashboard', {
				url: "/dashboard",
				templateUrl: 'app/views/pages/dashboard.html',
				controller: 'DashboardController'
			})
			.state('signup', {
				url: '/signup',
				templateUrl: 'app/views/pages/signup.html',
				controller: 'SignUpController'
			})
			.state('profile', {
				url: '/profile',
				templateUrl: 'app/views/pages/profile.html',
				controller: 'ProfileController'
			});

	});
