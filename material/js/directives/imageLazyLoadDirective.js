var module = angular.module('writer.directives');

module.directive('imageLazyLoad', function($rootScope) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            var image = element[0];
            var imageIndex = $scope.$eval(attrs.imageIndex);
            var postIndex = $scope.$eval(attrs.postIndex);
            var src = attrs.imageLazyLoad;

            function isVisible(element) {
                if (postIndex == 0 && imageIndex == 0) {
                    return true;
                }

                var rect = image.getBoundingClientRect();
                return rect.top >= 0 && rect.left >= 0 && rect.bottom <= $(window).height();
            }

            function lazyLoad() {
                if (isVisible(image)) {
                    image.src = src;
                    document.removeEventListener('scroll', lazyLoad);
                }
            }

            if (!isVisible(image)) {
                document.addEventListener('scroll', lazyLoad);
            } else {
                image.src = src;
            }

            // Destroy listener on state change
            $rootScope.$on('$stateChangeStart', function() {
                document.removeEventListener('scroll', lazyLoad);
            });
        }
    };
});
