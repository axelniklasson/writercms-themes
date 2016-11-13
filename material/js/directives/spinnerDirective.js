var module = angular.module('writer.directives');

module.directive('spinner', function() {
    return {
        restrict: 'E',
        template: '<div class="spinner-wrapper" ng-show="loading"><div class="preloader-wrapper active">' +
        '<div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div>' +
        '</div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right">' +
        '<div class="circle"></div></div></div></div></div>'
    };
});

module.directive('lazySpinner', function() {
    return {
        restrict: 'E',
        template: '<div class="lazy-spinner-wrapper" ng-show="lazyLoading"><div class="preloader-wrapper active">' +
        '<div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div>' +
        '</div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right">' +
        '<div class="circle"></div></div></div></div></div>'
    };
});

module.directive('spin', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/directives/spinner.html',
        scope: {
            loading: '=when'
        }
    };
});
