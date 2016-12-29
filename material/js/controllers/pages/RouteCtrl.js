var module = angular.module('writer.controllers');

module.controller('RouteCtrl', function($scope, PostService, NgMap) {
    PostService.getAllLocations().success(function(response) {
        $scope.posts = response;
        $scope.startLat = $scope.posts[0].location.latitude;
        $scope.startLng = $scope.posts[0].location.longitude;
    }).error(function(err) {
        Materialize.toast('Kunde inte hämta platser!', 2000);
        console.log(err);
    });

    $scope.showPost = function(event, post) {
        $scope.selectedPost = post;
        $scope.map.showInfoWindow('infoWindow', this);
    };

    $scope.generateIcon = function(post) {
        return {
            url: post.author.profilePic,
            scaledSize: [32, 32]
        };
    }

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
