var module = angular.module('writer.controllers');

module.controller('NewCategoryCtrl', function($scope, CategoryService) {
    $scope.createCategory = function() {
        var category = { name: $scope.category.name };

        CategoryService.createCategory(category).success(function(response) {
            $scope.category = {};
            Materialize.toast('Kategorin är skapad!', 2000);
            $('form label').removeClass('active');
        }).error(function(err) {
            Materialize.toast('Det gick inte att skapa kategorin.', 2000);
            console.log(err);
        });
    }
});
