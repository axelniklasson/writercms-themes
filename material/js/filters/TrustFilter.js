var module = angular.module('writer.filters');

module.filter('trust', ['$sce', function($sce) {
    return function(html) {
        return $sce.trustAsHtml(html);
    }
}]);
