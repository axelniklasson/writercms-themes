var module = angular.module('writer.controllers');

module.controller('RouteCtrl', function($scope) {
    $scope.countdownDate = new Date(2017, 0, 17, 06, 50, 00);

    $scope.$emit('newPageLoaded', {
        title: 'Vår rutt',
        description: 'Här finns information om vår rutt och våra planer inför resan.',
        author: 'Axel Niklasson',
        image: {
            url: 'http://66.media.tumblr.com/3dbf290f6477026a098a8369e1d96665/tumblr_mj9jshtzH01qadknpo1_1280.jpg',
            width: 1024,
            height: 683
        }
    });
});
