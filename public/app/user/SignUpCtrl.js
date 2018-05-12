angular.module('SignUpCtrl', ['UserService'])
.controller('SignUpController', function($rootScope, $scope, UserService, $location){
  $scope.text = "This is where you can sign up";

  $scope.user; 
   

  $scope.signup = function(user){
    console.log(user);
    UserService.create(user).then((success)=>{
      $rootScope.storeAccount(success.data.token, success.data.user);
      console.log("Logging in!", success);
      $location.path('/dashboard');
    }, (err)=>{
      console.log("Sign Up was not successfull: ", err);
    })
  }
})
