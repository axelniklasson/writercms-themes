var module = angular.module('writer.controllers');

module.controller('AppCtrl', function($rootScope, $scope, $state, AuthService, DashboardService) {
    $scope.showFooter = false;
    $scope.countdownDate = new Date(2017, 0, 17, 06, 50, 00);

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

    // Toggle footer visibility depending on load
    $rootScope.$on('loading:progress', function (){
        $scope.showFooter = false;
    });

    $rootScope.$on('loading:finish', function (){
        $scope.showFooter = true;
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
