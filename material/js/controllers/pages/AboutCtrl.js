var module = angular.module('writer.controllers');

module.controller('AboutCtrl', function($scope, UserService, SocialService) {
    $scope.loading = true;
    $scope.loadingFeed = true;

    UserService.getAllUsers().success(function(response) {
        $scope.loading = false;
        $scope.users = response;
    }).error(function(err) {
        Materialize.toast('Kunde inte hämta användare.', 2000);
        $scope.loading = false;
        console.log(err);
    });


    SocialService.getInstaFeed('axel.niklasson').success(function(response){
        $scope.feed = response.items;
        console.log(response.items);
        $scope.loadingFeed = false;
    }).error(function(err) {
        $scope.loadingFeed = false;
        $scope.instaFeedError = true;
    });

    $scope.$emit('newPageLoaded', {
        title: 'Om oss',
        description: 'Vilka är vi egentligen? Här kan man läsa mer om oss som driver sidan.',
        author: 'Axel Niklasson',
        image: {
            url: 'http://66.media.tumblr.com/3dbf290f6477026a098a8369e1d96665/tumblr_mj9jshtzH01qadknpo1_1280.jpg',
            width: 1024,
            height: 683
        }
    });
});
