var module = angular.module('writer.controllers');

module.controller('AdminCommentCtrl', function($scope, $state, CommentService) {
	$scope.$on('$viewContentLoaded', function() {
		$scope.loading = true;
		fetchComments();
	});

	function fetchComments() {
		CommentService.getAllComments().success(function(response) {
			$scope.loading = false;
			$scope.newComments = [];
			$scope.readComments = [];

			angular.forEach(response, function(value, key) {
				value.read ? $scope.readComments.push(value) : $scope.newComments.push(value);
			});
		}).error(function(err) {
			Materialize.toast('Det gick inte att hämta kommentarer.', 2000);
			$scope.loading = false;
			console.log(err);
		});
	}

	$scope.markAsRead = function(index, comment) {
		CommentService.markCommentAsRead(comment._id).success(function(response) {
			$scope.newComments.splice(index, 1);
			$scope.readComments.unshift(comment);
			Materialize.toast('Kommentaren är markerad som läst.', 2000);
		}).error(function(err) {
			Materialize.toast('Kunde inte markera kommentaren som läst.', 2000);
			console.log(err);
		});
	}
});
