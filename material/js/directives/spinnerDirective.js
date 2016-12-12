var module = angular.module('writer.directives');

module.directive('spin', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/directives/spinner.html',
        scope: {
            loading: '=when'
        }
    };
});
