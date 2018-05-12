angular.module("AccountCtrl", ['UserService'])
    .controller("AccountController", function ($rootScope, $scope, UserService) {
        $scope.$on('$viewContentLoaded', function () {

            $rootScope.showNav = true;


        });
        $scope.user; 

        $scope.save = function(user) {
            UserService.create(user)
            .then((success)=>{

            }, (err)=>{
                console.log(err);
            })
        }
    })