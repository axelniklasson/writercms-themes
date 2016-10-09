var module = angular.module('writer.controllers');

module.controller('AdminUsersCtrl', function($scope, UserService) {
    $scope.$on('$viewContentLoaded', function() {
        fetchUsers();
        $scope.loading = true;
    });

    function fetchUsers() {
        UserService.getAllUsers().success(function(response) {
            $scope.users = response;
            $scope.loading = false;
        }).error(function(err) {
            $scope.users = [];
            $scope.loading = false;
            console.log(err);
        });
    }
});
