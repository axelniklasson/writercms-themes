var module = angular.module('writer.controllers');

module.controller('AdminCategoryDetailCtrl', function($scope, $stateParams, $state, CategoryService) {
    $('.modal').modal();
    $scope.loading = true;

    CategoryService.getCategoryByID($stateParams.id).success(function(response) {
        $scope.category = response;
        $scope.loading = false;
    }).error(function(err) {
        $scope.category = {};
        $scope.loading = false;
        console.log(err);
    });

    $scope.updateCategory = function() {
        CategoryService.updateCategory($scope.category).success(function(response) {
            Materialize.toast('Kategorin är uppdaterad!', 2000);
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Kategorin kunde inte uppdateras!', 2000);
        })
    }

    $scope.deleteCategory = function() {
        CategoryService.deleteCategory($scope.category._id).success(function(response) {
            Materialize.toast('Kategorin är raderad!', 2000);
            $state.go('base.admin.categories');
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Kategorin kunde inte raderas!', 2000);
        })
    }
});
