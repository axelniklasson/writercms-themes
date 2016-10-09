var module = angular.module('writer.directives');

module.directive('countdown', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/directives/countdown.html',
        link: function($scope, elem, attrs) {

            $scope.days = 0;
            $scope.hours = 0;
            $scope.minutes = 0;
            $scope.seconds = 0;

            function refresh() {
                var diff = $scope.countdownDate.getTime() - Date.now();

                var days = Math.floor(diff / (1000 * 3600 * 24));
                diff %= (1000 * 3600 * 24);
                var hours = Math.floor(diff / (1000 * 3600));
                diff %= (1000 * 3600);
                var minutes = Math.floor(diff / (1000 * 60));
                diff %= (1000 * 60);
                var seconds = Math.floor(diff / 1000);

                $scope.$apply($scope.days = days);
                $scope.$apply($scope.hours = hours);
                $scope.$apply($scope.minutes = minutes);
                $scope.$apply($scope.seconds = seconds);
            }

            setInterval(refresh, 1000);
        }
    }
});
