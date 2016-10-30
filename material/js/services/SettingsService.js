var module = angular.module('writer.services');

module.factory('SettingsService', function($http) {
    return {
        getAllSettings: function() {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/settings',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        set: function(key, value) {
            var req = {
                method: 'POST',
                url: $http.defaults.base_url + '/settings',
                data: {
                    key: key,
                    value: value
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Token': localStorage.getItem('token'),
                }
            }

            return $http(req);
        }
    }
});
