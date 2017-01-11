var module = angular.module('writer.directives');

module.directive('lazyLoad', function($rootScope, $timeout, PostService, LocalStorageService) {
    return {
        restrict: 'E',
        link: function ($scope, element, attrs) {

            $timeout(function() {
                var options = $scope.$eval(attrs.options);
                options.dataSet = [];
                var skip = 0;
                var fetchedAll = false;

                function fetch() {
                    options.dataSet == null ? $scope.loading = true : $scope.lazyLoading = true;
                    options.fetcher(skip, options.take).success(function(response) {

                        // Know when to stop lazyLoading
                        if (response.length < options.take || response.length == 0) {
                            fetchedAll = true;
                        }

                        // Concat data (beware of async) and toggle spinners
                        if (options.dataSet.length == 0) {
                            options.dataSet = response;
                        } else {
                            options.dataSet.splice.apply(options.dataSet, [skip, 0].concat(response));
                        }

                        $scope.lazyLoading ? $scope.lazyLoading = false : $scope.loading = false;
                        lazyLoad();
                    }).error(function(err) {
                        options.dataSet = [];
                        $scope.lazyLoading ? $scope.lazyLoading = false : $scope.loading = false;
                        console.log(err);
                    });
                }

                // Register scroll listener and fetch 5 more posts when last post is in focus
                function lazyLoad() {
                    var list = $(element).parent();

                    if (list.height() < $(window).height() && !fetchedAll) {
                        if (list.offset().top + list.outerHeight(true) < $(window).height()) {
                            skip += options.take;
                            fetch();
                        }
                    }

                    var target = list.find('li:nth-last-child(3)');
                    if (target.length == 1) {
                        if (elementInViewport(target[0]) && !fetchedAll) {
                            skip += options.take;
                            fetch();
                            document.removeEventListener('scroll', lazyLoad);
                        } else if (!fetchedAll) {
                            document.addEventListener('scroll', lazyLoad);
                        }
                    }
                }

                // Load posts when view is rendered
                $scope.$on('$viewContentLoaded', function() {
                    options.dataSet = [];
                    $scope.loading = true;
                    lazyLoad();
                });

                // Destroy listener on state change
                $rootScope.$on('$stateChangeStart', function() {
                    document.removeEventListener('scroll', lazyLoad);
                });

                fetch();
            }, 0);
        }
    };
});

function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight) &&
        (left + width) <= (window.pageXOffset + window.innerWidth)
    );
}
