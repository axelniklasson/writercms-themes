var module = angular.module('writer.controllers');

module.controller('NewUserCtrl', function($scope, $stateParams, UserService) {
    $scope.createUser = function() {
        var user = { firstName: $scope.user.firstName, lastName: $scope.user.lastName,
            username: $scope.user.username, password: $scope.user.password1 };

            UserService.createUser(user).success(function(response) {
                $scope.user = {};
                Materialize.toast('Användaren är skapad!', 2000);
                $('form label').removeClass('active');
            }).error(function(err) {
                Materialize.toast('Det gick inte att skapa användaren.', 2000);
                console.log(err);
            });
        }
    });
