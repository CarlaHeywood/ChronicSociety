
angular.module('UserService', []).factory('UserService', ['$rootScope', '$http', function($rootScope, $http) {

    return {
        create: function(user) {
            return $http.post('/users', user) ;
        },
        get: function(user){
            return $http.get('/users/user', setHeaders($rootScope.token))
        },
        update: function(user){
            return $http.put('/users/user/update', user, setHeaders($rootScope.token))
        },
        login: function(user){
            return $http.post('/users/login', user);
        },         
        deleteToken: function(token){
            return $http.delete('/users/user/remove/token', setHeaders($rootScope.token));
        }
    }

}]);
