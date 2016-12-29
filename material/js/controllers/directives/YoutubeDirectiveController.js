var module = angular.module('writer.controllers');

module.controller('YoutubeDirectiveController', function($scope, $sce) {
    $scope.youtubeSrc = 'https://www.youtube.com/embed/' + $scope.id;

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
});
