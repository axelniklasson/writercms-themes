var module = angular.module('writer.services');

module.factory('DashboardService', function($http) {
    return {
        getStatus: function() {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/dashboard',
                headers: {
                    'Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        getLastPost: function() {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/dashboard/lastpost',
                headers: {
                    'Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        getStats: function() {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/stats',
                headers: {
                    'Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        getVersion: function() {
            var req = {
                method: 'GET',
                url: 'https://api.github.com/repos/WriterCMS/writercms-core/git/refs/heads/master'
            }

            return $http(req);
        }
    }
});
