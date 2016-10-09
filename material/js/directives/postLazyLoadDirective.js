var module = angular.module('writer.directives');

module.directive('lazyLoadPosts', function($rootScope, PostService, LocalStorageService) {
    return {
        restrict: 'E',
        link: function ($scope, element, attrs) {
            var skip = 0;
            var take = 5;

            function fetchPosts() {
                $scope.posts == null ? $scope.loading = true : $scope.lazyLoading = true;

                PostService.skipAndTake(skip, take).success(function(response) {
                    $scope.posts != null ? $scope.posts = $scope.posts.concat(response) : $scope.posts = response;
                    $scope.lazyLoading ? $scope.lazyLoading = false : $scope.loading = false;

                    // Initialize comments collapsible in timeout for some reason
                    setTimeout(function() { $('.collapsible').collapsible(); }, 0);

                    angular.forEach($scope.posts, function(post, index) {
                        post.hasLiked = LocalStorageService.hasLikedPost(post._id);
                    });

                    document.addEventListener('scroll', getDistanceToBottom);
                }).error(function(err) {
                    $scope.posts = [];
                    $scope.lazyLoading ? $scope.lazyLoading = false : $scope.loading = false;
                    console.log(err);
                });
            }

            // Register scroll listener and fetch 5 more posts when last post is in focus
            function getDistanceToBottom() {
                var scrollPosition = window.pageYOffset;
                var windowSize = window.innerHeight;
                var bodyHeight = document.body.offsetHeight;
                var distance = Math.max(bodyHeight - (scrollPosition + windowSize), 0);

                // Paginate, remove listener and fetch new posts
                if (distance < 200) {
                    skip += take;
                    document.removeEventListener('scroll', getDistanceToBottom);
                    fetchPosts();
                }
            }

            // Destroy listener on state change
            $rootScope.$on('$stateChangeStart', function() {
                document.removeEventListener('scroll', getDistanceToBottom);
            });

            fetchPosts();
        }
    };
});
