var module = angular.module('writer.services');

module.factory('CategoryService', function($http) {
    return {
        getAllCategories: function() {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/categories',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        getCategoryByID: function(ID) {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/categories/' + ID,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        createCategory: function(category) {
            var req = {
                method: 'POST',
                url: $http.defaults.base_url + '/categories',
                data: category,
                headers: {
                    'Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        updateCategory: function(category) {
            var req = {
                method: 'PUT',
                url: $http.defaults.base_url + '/categories/' + category._id,
                data: category,
                headers: {
                    'Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        deleteCategory: function(ID) {
            var req = {
                method: 'DELETE',
                url: $http.defaults.base_url + '/categories/' + ID,
                headers: {
                    'Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        }
    }
});
