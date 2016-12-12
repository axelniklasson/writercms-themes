var module = angular.module('writer.controllers');

module.controller('PostCtrl', function($scope, $state, $timeout, PostService, CommentService, LocalStorageService) {
    $scope.newComment = false;
    $scope.comment = {};
    $scope.ui = {
        editing: {
            active: false,
            post: 0
        }
    };

    $scope.toggleEdit = function(post) {
        if (!$scope.ui.editing.active) {
            $scope.ui.editing.active = true;
            $scope.ui.editing.post = post._id;
        } else {
            $scope.ui.editing.active = false;
            $scope.ui.editing.post = 0;
        }
    }

    $scope.showCommentForm = function() {
        $scope.newComment = true;
    }

    $scope.hideCommentForm = function() {
        $scope.newComment = false;
    }

    $scope.likePost = function(post) {
        PostService.likePost(post._id).success(function(response) {
            post.likes++;
            LocalStorageService.markPostAsLiked(post._id);
            post.hasLiked = true;
        }).error(function(err) {
            Materialize.toast('Det går inte gilla inlägget just nu!', 2000);
        });
    }

    $scope.updatePost = function(post) {
        PostService.updatePost(post).success(function(response) {
            Materialize.toast('Inlägget är uppdaterat!', 2000);
            post.editing = false;
            $scope.ui.editing = {
                active: false,
                post: 0
            };
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Inlägget kunde inte uppdateras!', 2000);
        });
    }

    $scope.submitComment = function(post) {
        $scope.comment.post = post._id;
        CommentService.submitComment($scope.comment).success(function(response) {
            post.comments.unshift(response);
            Materialize.toast('Din kommentar har postats!', 2000);
            $scope.newComment = false;
            $scope.comment = {};
        }).error(function(err) {
            Materialize.toast('Din kommentar kunde inte postas!', 2000);
        });
    }
});
