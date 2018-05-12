angular.module('LoginCtrl', ['UserService'])
.controller('LoginController', function($rootScope, $scope, UserService, $location){
  $scope.text = "Welcome Back!";

  $scope.err = "";
  $scope.user; 
   

  $scope.login = function(user){
    console.log(user);
    UserService.login(user).then((success)=>{
      console.log("Logging in!", success);
      $rootScope.storeAccount(success.data.token, success.data.user);

      $location.path('/dashboard');
    }, (err)=>{
      console.log("You definitely did not make it in: ", err);
      $scope.err = "Incorrect Login Credentials";
    })
  }
})
