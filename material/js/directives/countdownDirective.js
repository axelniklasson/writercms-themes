var module = angular.module('writer.directives');

module.directive('countdown', ['$interval', function($interval) {
    return {
        restrict: 'E',
        templateUrl: 'partials/directives/countdown.html',
        link: function($scope, elem, attrs) {
            var countdown = function() {
                var diff = $scope.countdownDate.getTime() - Date.now();

                var days = Math.floor(diff / (1000 * 3600 * 24));
                diff %= (1000 * 3600 * 24);
                var hours = Math.floor(diff / (1000 * 3600));
                diff %= (1000 * 3600);
                var minutes = Math.floor(diff / (1000 * 60));
                diff %= (1000 * 60);
                var seconds = Math.floor(diff / 1000);

                $scope.days = days;
                $scope.hours = hours;
                $scope.minutes = minutes;
                $scope.seconds = seconds;
            }

            countdown();
            $interval(countdown, 1000);
        }
    }
}]);
