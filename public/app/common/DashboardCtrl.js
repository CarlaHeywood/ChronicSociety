angular.module('DashboardCtrl', ['UserService'])
  .controller('DashboardController', function ($rootScope, $scope, UserService, $location) {
    $scope.$on('$viewContentLoaded', function () {

      //$rootScope.showNav = true;

    });


  })
