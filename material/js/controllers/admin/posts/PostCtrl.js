var module = angular.module('writer.controllers');

module.controller('AdminPostCtrl', function($scope, PostService) {
    $scope.data = {
        dataSet: $scope.posts,
        fetcher: PostService.listSkipAndTake,
        take: 5
    };
});
