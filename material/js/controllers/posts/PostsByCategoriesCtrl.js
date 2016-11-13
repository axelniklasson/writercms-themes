var module = angular.module('writer.controllers');

module.controller('PostsByCategoriesCtrl', function($scope, $stateParams, $timeout, PostService, CategoryService) {
    $scope.loading = true;
    $scope.filterCategories = [];

    CategoryService.getAllCategories().success(function(response) {
        $scope.categories = response;
        $scope.loading = false;
    }).error(function(err) {
        Materialize.toast('Det gick inte att hämta kategorier.', 2000);
        $scope.loading = false;
        console.log(err);
    });

    $scope.toggleFilter = function(id) {
        var index = $scope.filterCategories.indexOf(id);
        if (index !== -1) {
            $scope.filterCategories.splice(index, 1);
        } else {
            $scope.filterCategories.push(id);
        }
    }

    var init = true;
    $scope.$watchCollection('filterCategories', function() {
        if (init) {
            $timeout(function() { init = false; });
        } else {
            if ($scope.filterCategories.length == 0) {
                $scope.posts = [];
            } else {
                $scope.loadingPosts = true;
                PostService.filterByCategories($scope.filterCategories).success(function(response) {
                    $scope.posts = response;
                    $scope.loadingPosts = false;
                }).error(function(err) {
                    Materialize.toast('Det gick inte att filtrera inlägg!', 2000);
                    $scope.loadingPosts = false;
                    console.log(err);
                });
            }
        }
    });
});
