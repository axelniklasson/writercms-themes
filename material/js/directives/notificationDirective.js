var module = angular.module('writer.directives');

module.directive('notification', ['$rootScope', '$timeout',
function($rootScope, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'partials/directives/notification.html',
        scope: {
            count: '=count'
        }
    };
}
]);
