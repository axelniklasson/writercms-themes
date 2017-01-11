var module = angular.module('writer.controllers');

module.controller('AboutCtrl', function($rootScope, $scope, UserService, SocialService) {
    $scope.loading = true;
    $scope.loading = true;
    $scope.instaFeed = {
        axel: [],
        martin: [],
        loading: {
            axel: true,
            martin: true
        }
    };

    UserService.getAllUsers().success(function(response) {
        $scope.loading = false;
        $scope.users = response;
    }).error(function(err) {
        Materialize.toast('Kunde inte hämta användare.', 2000);
        $scope.loading = false;
        console.log(err);
    });

    $rootScope.$watchGroup(['settings.instagramUser1', 'settings.instagramUser2'], function(newValues, oldValues) {
        if (newValues[0] != undefined && newValues[1] != undefined) {
            $scope.getInstaFeedData();
        }
    });

    $scope.getInstaFeedData = function() {
        SocialService.getInstaFeed($rootScope.settings.instagramUser1).success(function(response){
            $scope.instaFeed.axel = response;
            $scope.instaFeed.loading.axel = false;
        }).error(function(err) {
            $scope.instaFeed.loading.axel = false;
            $scope.instaFeedError = true;
        });

        SocialService.getInstaFeed($rootScope.settings.instagramUser2).success(function(response){
            $scope.instaFeed.martin = response;
            $scope.instaFeed.loading.martin = false;
        }).error(function(err) {
            $scope.instaFeed.loading.martin = false;
            $scope.instaFeedError = true;
        });
    }

    $scope.$watch('instaFeed.loading', function(newVal, oldVal) {
        if (newVal != oldVal && (!newVal.axel && !newVal.martin)) {
            // All feeds fetched. Merge arrays and sort
            $scope.feed = angular.copy($scope.instaFeed.axel);
            for (var i = 0; i < $scope.instaFeed.martin.length; i++) {
                var martin = $scope.instaFeed.martin[i];

                for (var j = 0; j < $scope.feed.length; j++) {
                    if (moment(martin.created_time, 'x').isAfter(moment($scope.feed[j].created_time, 'x'))) {
                        $scope.feed.splice(j, 0, martin);
                        break;
                    }
                }
            }
        }
    }, true)

    $scope.$emit('newPageLoaded', {
        title: 'Om oss',
        description: 'Vilka är vi egentligen? Här kan man läsa mer om oss som driver bloggen.',
        author: 'Axel Niklasson',
        image: {
            url: 'http://66.media.tumblr.com/3dbf290f6477026a098a8369e1d96665/tumblr_mj9jshtzH01qadknpo1_1280.jpg'
        }
    });
});
