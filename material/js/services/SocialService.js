var module = angular.module('writer.services');

module.factory('SocialService', function($http) {
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
        }
    }
});
