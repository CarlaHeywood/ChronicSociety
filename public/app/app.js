var MyApp = angular.module('MyApp', ['appRoutes', 'ngCookies', 'SignUpCtrl', 'LoginCtrl', 'AccountCtrl', 'DashboardCtrl']);


MyApp.run(['$rootScope', '$cookies', '$location', function ($rootScope, $cookies, $location) {

    console.log("Running")
    console.log("User: ", $rootScope.user);
    console.log("cookies object: ", $cookies.getObject("user"))
    console.log("cookies object: ", $cookies.getObject("token"))
    console.log("$cookies is: ", $cookies)

    if (!$rootScope.token)
        $rootScope.token = $cookies.getObject("token");

    if (!$rootScope.user)
        $rootScope.user = $cookies.getObject("user");

    // $rootScope.currentStep = parseInt($cookies.getObject("tour"), 10) || 0;

    // $rootScope.tourEnded = function () {
    //     $cookies.putObject('tour', -1);
    // };

    // $rootScope.stepComplete = function (stp) {
    //     $cookies.putObject('tour', stp);
    // };

    // $rootScope.tourComplete = function () {
    //     $cookies.putObject('tour', -1);
    // };

    // $rootScope.tourRestart = function () {
    //     $rootScope.currentStep = 0;
    //     $cookies.putObject('tour', $rootScope.currentStep);
    // };

    $rootScope.storeAccount = function (token, user) {
        if (user) {
            $rootScope.user = user;
            console.log($rootScope.user);
            $cookies.putObject('user', $rootScope.user);
            console.log($cookies.getObject('user'));
        }
        if (token) {
            $rootScope.token = token;
            console.log($rootScope.token);
            $cookies.putObject('token', $rootScope.token);
            console.log($cookies.getObject('token'));
        }
        console.log("$COOKIES AFTER", $cookies)
    };

    $rootScope.isLoggedIn = function () {
        if ($rootScope.user) {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.logout = function () {
        $rootScope.user = null;
        $rootScope.token = null;
        $rootScope.showNav = false;

        $cookies.remove('token');
        $cookies.remove('account');
        $location.path("/login");
    };
}])

var setHeaders = function (token) {
    if (token) {
        return {
            headers: {
                'x-auth': token
            }
        };
    }
};