
angular.module('UserService', []).factory('UserService', ['$rootScope', '$http', function($rootScope, $http) {

    return {

        create: function(user) {

            return $http.post('/users', user) ;
        },

        login: function(user){
            return $http.post('/users/login', user);
        },
         
        deleteToken: function(token){
            return $http.delete('/users/user/remove/token', setHeaders($rootScope.token));
        }

    }

}]);
