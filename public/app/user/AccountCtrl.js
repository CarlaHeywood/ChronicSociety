angular.module("AccountCtrl", ['UserService'])
    .controller("AccountController", function ($rootScope, $scope, UserService) {
        $scope.$on('$viewContentLoaded', function () {

            $rootScope.showNav = true;


        });
        $scope.user;

        $scope.update = function (user) {
            console.log("User is: ", user);
            UserService.update(user)
                .then((success) => {
                    console.log("UPDATE SUCCESSFULL: ", success)

                }, (err) => {
                    console.log(err);
                })
        }

        $scope.getUser = function () {
            console.log("Token is still active: ", $rootScope.token)
            console.log("user logged in is: ", $rootScope.user)
            UserService.get()
                .then((success) => {
                    console.log("GetUser Success: ", success);
                    $scope.user = success.data.user[0];
                }, (err) => {
                    console.log("Err: ", err);
                })
        }

        $scope.logout = function () {
            UserService.deleteToken().then((success) => {
                console.log("Logged out: ", success);

            }, (err) => {
                console.log("Err: ", err);
            });
            $rootScope.logout();
        }

        $scope.getUser();
    })