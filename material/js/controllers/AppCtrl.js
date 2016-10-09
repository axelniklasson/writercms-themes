var module = angular.module('writer.controllers');

module.controller('AppCtrl', function($scope, $state, AuthService, DashboardService) {
    // Default metadata
    $scope.meta = {
        title: 'Asien 2017',
        description: 'Upplevelser och bilder från två backpackers på vift.',
        author: 'Axel Niklasson',
        image: {
            url: 'http://66.media.tumblr.com/3dbf290f6477026a098a8369e1d96665/tumblr_mj9jshtzH01qadknpo1_1280.jpg',
            width: 1024,
            height: 683
        }
    }

    $scope.$on('newPageLoaded', function(event, metadata) {
        $scope.meta = metadata;
    });

    $scope.logOut = function() {
        AuthService.logOut();
        location.reload(); // TODO fix this
    }

    DashboardService.getVersion().success(function(response) {
        $scope.versionHash = response.object.sha.substring(0, 7);
    }).error(function(err) {
        console.log(err);
    });
});
