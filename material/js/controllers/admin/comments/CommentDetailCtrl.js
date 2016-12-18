var module = angular.module('writer.controllers');

module.controller('AdminCommentDetailCtrl', function($scope, $state, $stateParams,
	CommentService) {
		$('.modal').modal();
		$scope.loading = true;

		CommentService.getCommentByID($stateParams.id).success(function(response) {
			$scope.loading = false;
			$scope.comment = response;
		}).error(function(err) {
			Materialize.toast('Det gick inte att hämta kommentarer.', 2000);
			$scope.loading = false;
			console.log(err);
		});

		$scope.deleteComment = function() {
			CommentService.deleteComment($scope.comment._id).success(function(response) {
				Materialize.toast('Kommentaren är raderad!', 2000);
				$state.go('base.admin.comments');
			}).error(function(err) {
				console.log(err);
				Materialize.toast('Kommentaren kunde inte raderas!', 2000);
			})
		}
	});
