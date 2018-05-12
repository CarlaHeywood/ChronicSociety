angular.module("ProfileCtrl", ['UserService'])
    .controller("ProfileController", function ($rootScope, $scope, UserService) {
        $scope.$on('$viewContentLoaded', function () {

            $rootScope.showNav = true;


        });
        $scope.profilePage = "Profile Page";
    })