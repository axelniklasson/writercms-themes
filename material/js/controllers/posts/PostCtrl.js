var module = angular.module('writer.controllers');

module.controller('PostCtrl', function($scope, $state, $timeout, PostService, CommentService, LocalStorageService) {
    $scope.newComment = false;
    $scope.comment = {};

    $scope.showEditFields = function(post) {
        post.editing = true;
        $('#postContent').trigger('autoresize');
    }

    $scope.hideEditFields = function(post) {
        post.editing = false;
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
