var module = angular.module('writer.controllers');

module.controller('AdminCategoriesCtrl', function($scope, CategoryService) {
    $scope.$on('$viewContentLoaded', function() {
        $scope.loading = true;
        fetchCategories();
    });

    function fetchCategories() {
        CategoryService.getAllCategories().success(function(response) {
            $scope.loading = false;
            $scope.categories = response;
        }).error(function(err) {
            $scope.loading = false;
            $scope.categories = [];
            console.log(err);
        });
    }
});
