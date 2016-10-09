var module = angular.module('writer.services');

module.factory('AuthService', function($http, $rootScope) {
    return {
        isAuthenticated: function() {
            return !(localStorage.getItem('token') === null);
        },
        logIn: function(credentials) {
            var req = {
                method: 'POST',
                url: $http.defaults.base_url + '/auth/login',
                data: credentials,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        logOut: function() {
            localStorage.removeItem('token');
        }
    }
});
