var module = angular.module('writer.services');

module.factory('UserService', function($http) {
	return {
		getAllUsers: function() {
			var req = {
				method: 'GET',
				url: $http.defaults.base_url + '/users',
				headers: {
					'Content-Type': 'application/json',
					'Token': localStorage.getItem('token')
				}
			}

			return $http(req);
		},
		getUserByID: function(ID) {
			var req = {
				method: 'GET',
				url: $http.defaults.base_url + '/users/' + ID,
				headers: {
					'Content-Type': 'application/json',
					'Token': localStorage.getItem('token')
				}
			}

			return $http(req);
		},
		updateUser: function(user) {
			var req = {
				method: 'PUT',
				url: $http.defaults.base_url + '/users/' + user._id,
				data: user,
				headers: {
					'Content-Type': 'application/json',
					'Token': localStorage.getItem('token')
				}
			}

			return $http(req);
		},
		createUser: function(user) {
			var req = {
				method: 'POST',
				url: $http.defaults.base_url + '/users',
				data: user,
				headers: {
					'Content-Type': 'application/json',
					'Token': localStorage.getItem('token')
				}
			}

			return $http(req);
		},
		deleteUser: function(ID) {
			var req = {
				method: 'DELETE',
				url: $http.defaults.base_url + '/users/' + ID,
				headers: {
					'Token': localStorage.getItem('token'),
					'Content-Type': 'application/json'
				}
			}

			return $http(req);
		},
		getProfileData: function() {
			var req = {
				method: 'GET',
				url: $http.defaults.base_url + '/users/' + localStorage.getItem('userID'),
				headers: {
					'Content-Type': 'application/json',
					'Token': localStorage.getItem('token')
				}
			}

			return $http(req);
		},
		updateProfileData: function(user) {
			var req = {
				method: 'PUT',
				url: $http.defaults.base_url + '/users/' + localStorage.getItem('userID'),
				data: user,
				headers: {
					'Content-Type': 'application/json',
					'Token': localStorage.getItem('token')
				}
			}

			return $http(req);
		}
	}
});
