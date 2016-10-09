var module = angular.module('writer.services');

module.factory('CommentService', function($http) {
    return {
        getAllComments: function() {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/comments',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        getCommentByID: function(ID) {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/comments/' + ID,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        submitComment: function (comment) {
            var req = {
                method: 'POST',
                url: $http.defaults.base_url + '/comments',
                data: comment,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            return $http(req);
        },
        deleteComment: function(ID) {
            var req = {
                method: 'DELETE',
                url: $http.defaults.base_url + '/comments/' + ID,
                headers: {
                    'Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }
            return $http(req);
        },
        markCommentAsRead: function(ID) {
            var req = {
                method: 'POST',
                url: $http.defaults.base_url + '/comments/markasread/' + ID,
                headers: {
                    'Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }
            return $http(req);
        }
    }
});
