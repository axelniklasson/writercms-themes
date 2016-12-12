var module = angular.module('writer.directives');

module.directive('lazyLoad', function($rootScope, PostService, LocalStorageService) {
    return {
        restrict: 'E',
        link: function ($scope, element, attrs) {
            var options = $scope.$eval(attrs.options);
            var skip = 0;
            var fetchedAll = false;

            function fetchPosts() {
                options.dataSet == null ? $scope.loading = true : $scope.lazyLoading = true;

                options.fetcher(skip, options.take).success(function(response) {

                    // Know when to stop lazyLoading
                    if (options.dataSet && options.dataSet.concat(response).length === options.dataSet.length) {
                        // All data fetched
                        fetchedAll = true;
                    }

                    // Concat data and toggle spinners
                    options.dataSet != null ? options.dataSet = options.dataSet.concat(response) : options.dataSet = response;
                    $scope.lazyLoading ? $scope.lazyLoading = false : $scope.loading = false;

                    // Initialize comments collapsible in timeout for some reason
                    setTimeout(function() { $('.collapsible').collapsible(); }, 0);

                    angular.forEach($scope.posts, function(post, index) {
                        post.hasLiked = LocalStorageService.hasLikedPost(post._id);
                    });

                    lazyLoad();

                }).error(function(err) {
                    options.dataSet = [];
                    $scope.lazyLoading ? $scope.lazyLoading = false : $scope.loading = false;
                    console.log(err);
                });
            }

            // Register scroll listener and fetch 5 more posts when last post is in focus
            function lazyLoad() {
                var scrollPosition = window.pageYOffset;
                var windowSize = window.innerHeight;
                var bodyHeight = document.body.offsetHeight;
                var distance = Math.max(bodyHeight - (scrollPosition + windowSize), 0);

                // Paginate, remove listener and fetch new posts
                if (distance < 200 && !fetchedAll) {
                    skip += options.take;
                    document.removeEventListener('scroll', lazyLoad);
                    fetchPosts();
                } else if (distance >= 200 && !fetchedAll) {
                    $scope.loading = false;
                    document.addEventListener('scroll', lazyLoad);
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

            fetchPosts();
        }
    };
});
