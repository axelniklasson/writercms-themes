var module = angular.module('writer.directives');

module.directive('youtube', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/directives/youtube.html',
        scope: {
            id: '=id'
        },
        controller: 'YoutubeDirectiveController'
    };
});
