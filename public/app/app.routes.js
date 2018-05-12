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
			.state('account', {
				url: '/account',
				templateUrl: 'app/views/pages/account.html',
				controller: 'AccountController'
			})
			.state('contact', {
				url: "/contact",
				templateUrl: 'app/views/pages/contact.html',
				controller: 'ContactController'
			});
	});
