var module = angular.module('writer.controllers');

module.controller('LoginCtrl', function($rootScope, $scope, $state, AuthService) {
    $scope.logIn = function() {
        var credentials = { username: $scope.username, password: $scope.password };
        AuthService.logIn(credentials).success(function(response) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userID', response.userID);
            $rootScope.authenticated = true;
            $state.go('base.admin.dashboard');
        }).error(function(err) {
            switch (err.message) {
                case 'USER_NOT_FOUND':
                Materialize.toast('Ingen användare med det användarnamnet hittades!', 2000);
                break;

                case 'LOGIN_INVALID':
                Materialize.toast('Fel användarnamn eller lösenord!', 2000);
                break;

                default:
                Materialize.toast('Det gick inte att logga in!', 2000);
                break;
            }
        });
    }
});
