var MyApp = angular.module('MyApp', ['appRoutes', 'SignUpCtrl', 'LoginCtrl', 'AccountCtrl', 'DashboardCtrl', 'ngCookies']);


MyApp.run(['$rootScope', '$cookies', '$location', function ($rootScope, $cookies, $location) {

    if (!$rootScope.token)
        $rootScope.token = $cookies.getObject("token");

    if (!$rootScope.account)
        $rootScope.account = $cookies.getObject("user");

    $rootScope.currentStep = parseInt($cookies.getObject("tour"), 10) || 0;

    $rootScope.tourEnded = function () {
        $cookies.putObject('tour', -1);
    };

    $rootScope.stepComplete = function (stp) {
        $cookies.putObject('tour', stp);
    };

    $rootScope.tourComplete = function () {
        $cookies.putObject('tour', -1);
    };

    $rootScope.tourRestart = function () {
        $rootScope.currentStep = 0;
        $cookies.putObject('tour', $rootScope.currentStep);
    };

    $rootScope.storeAccount = function (token, user) {
        if (user) {
            $rootScope.user = user;
            $cookies.putObject('account', $rootScope.user);
        }
        if (token) {
            $rootScope.token = token;
            $cookies.putObject('token', $rootScope.token);
        }
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