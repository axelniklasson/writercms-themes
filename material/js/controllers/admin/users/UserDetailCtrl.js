var module = angular.module('writer.controllers');

module.controller('AdminUsersDetailCtrl', function($scope, $state, $stateParams, UserService) {
    $('.modal').modal();
    $scope.loading = true;

    UserService.getUserByID($stateParams.id).success(function(response) {
        $scope.user = response;
        $scope.loading = false;
    }).error(function(err) {
        $scope.users = [];
        $scope.loading = false;
        console.log(err);
    });

    $scope.updateUser = function() {
        UserService.updateUser($scope.user).success(function(response) {
            Materialize.toast('Användaren är uppdaterad!', 2000);
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Användaren kunde inte uppdateras!', 2000);
        })
    }

    $scope.deleteUser = function() {
        UserService.deleteUser($stateParams.id).success(function(response) {
            Materialize.toast('Användaren är raderad!', 2000);
            $state.go('base.admin.users');
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Användaren kunde inte raderas!', 2000);
        })
    }
});
