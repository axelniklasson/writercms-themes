var module = angular.module('writer.services');

module.factory('SocialService', function($http, $facebook, $rootScope, LocalStorageService) {
    // $rootScope.$on('fb.auth.sessionChange', function(event, response, FB) {
    //     console.log(response);
    // });
    //
    // $rootScope.$on('fb.auth.statusChange', function(event, response, FB) {
    //     console.log(response);
    // });

    return {
        getInstaFeed: function(username) {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/instagram/feed/' + username,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        getFacebookUserData: function() {
            $rootScope.social.fb.loading = true;
            $facebook.getLoginStatus().then(function(response) {
                $rootScope.social.fb.authenticated = (response.status == 'connected');
                if ($rootScope.social.fb.authenticated) {
                    if (!LocalStorageService.exists('fbUser')) {
                        var fbUser = {};
                        $facebook.api('/me').then(function(response) {
                            fbUser.name = response.name;
                            fbUser.id = response.id;

                            $facebook.api('/me/picture').then(function(response) {
                                fbUser.picture = response.data.url;
                                LocalStorageService.set('fbUser', fbUser);
                                $rootScope.social.fb.user = fbUser;
                                $rootScope.social.fb.loading = false;
                            }, function(err) {
                                console.log(err);
                                $rootScope.social.fb.loading = false;
                            });

                        }, function(err) {
                            console.log(err);
                            $rootScope.social.fb.loading = false;
                        });
                    } else {
                        $rootScope.social.fb.user = LocalStorageService.get('fbUser');
                        $rootScope.social.fb.loading = false;
                    }
                } else {
                    $rootScope.social.fb.loading = false;
                }
            }, function(err) {
                $rootScope.social.fb.authenticated = false;
                $rootScope.social.fb.loading = false;
            });
        },
        removeStashedFacebookUser: function() {
            $rootScope.social.fb.authenticated = false;
            $rootScope.social.fb.user = null;
            LocalStorageService.clear('fbUser');
        },
        initLinkedAccounts: function() {
            this.getFacebookUserData();
        }
    }
});
