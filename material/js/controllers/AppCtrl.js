var module = angular.module('writer.controllers');

module.controller('AppCtrl', function($rootScope, $scope, $facebook, $state, AuthService, DashboardService, SettingsService, LocalStorageService, SocialService, UserService) {
    $scope.showFooter = false;
    $scope.countdownDate = new Date(2017, 0, 17, 06, 50, 00);

    // Social stuff
    $rootScope.social = {
        fb: { authenticated: false },
        twitter: { authenticated: false }
    };
    SocialService.initLinkedAccounts();

    $('.button-collapse').sideNav({
        menuWidth: 220, // Default is 240
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: false // Choose whether you can drag to open on touch screens
    });

    $('.button-collapse').click(function() {
        $('#sidenav-overlay').first().remove();
    });

    // Load logged in user
    if ($rootScope.authenticated) {
        if (LocalStorageService.exists('cachedUser')) {
            $rootScope.user = LocalStorageService.get('cachedUser');
        } else {
            UserService.getProfileData().success(function(response) {
                LocalStorageService.set('cachedUser', response);
                $rootScope.user = response;
            }, function(err) {
                console.log(err);
            });
        }
    }

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

    // Fetch all settings
    SettingsService.getAllSettings().success(function(response) {
        $rootScope.settings = {};
        angular.forEach(response, function(settings) {
            $rootScope.settings[settings.key] = settings.value;
        });
    }).error(function(err) {
        Materialize.toast('Sidans inställningar kunde inte laddas.', 2000);
    });

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

    // DashboardService.getVersion().success(function(response) {
    //     $scope.versionHash = response.object.sha.substring(0, 7);
    // }).error(function(err) {
    //     console.log(err);
    // });
});
