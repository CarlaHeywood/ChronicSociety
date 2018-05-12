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

        $scope.getUser = function(){
            UserService.get()
            .then((success)=>{
                console.log("GetUser Success: ", success);
                $scope.user = success.data.user;
            }, (err)=>{
                console.log("Err: ", err);
            })
        }

        $scope.getUser(); 
    })