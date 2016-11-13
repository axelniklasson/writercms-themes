var module = angular.module('writer.controllers');

module.controller('PostDetailCtrl', function($scope, $stateParams, PostService, CommentService, LocalStorageService) {
    $scope.loading = true;
    $scope.editing = false;

    PostService.getPostByTimeAndSlug($stateParams.year, $stateParams.month, $stateParams.slug).success(function(response) {
        $scope.post = response;
        $scope.post.hasLiked = LocalStorageService.hasLikedPost($scope.post._id);
        var metadata = {
            title: $scope.post.title,
            description: $scope.post.content,
            author: $scope.post.author.firstName + ' ' + $scope.post.author.lastName
        };

        if ($scope.post.images.length > 0) {
            metadata.image = {
                url: $scope.post.images[0]
            };
            $scope.$emit('newPageLoaded', metadata);

            var image = new Image();
            image.addEventListener('load', function() {
                metadata.image.width = this.naturalWidth;
                metadata.image.height = this.naturalHeight;

                $scope.$emit('newPageLoaded', metadata);
                $scope.loading = false;
            });
            image.src = metadata.image.url;
        } else {
            $scope.$emit('newPageLoaded', metadata);
            $scope.loading = false;
        }

        // Initialize comments collapsible in timeout for some reason
        setTimeout(function() { $('.collapsible').collapsible(); }, 0);
    }).error(function(err) {
        $scope.post = {};
        $scope.loading = false;
        console.log(err);
    });

    $scope.showEditFields = function() {
        $scope.editing = true;
        $('#postContent').trigger('autoresize');
    }

    $scope.hideEditFields = function() {
        $scope.editing = false;
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
            $scope.editing = false;
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Inlägget kunde inte uppdateras!', 2000);
        });
    }

    $scope.showCommentForm = function() {
        $scope.newComment = true;
    }

    $scope.hideCommentForm = function() {
        $scope.newComment = false;
    }

    $scope.submitComment = function() {
        $scope.comment.post = $scope.post._id;
        CommentService.submitComment($scope.comment).success(function(response) {
            $scope.post.comments.unshift(response);
            Materialize.toast('Din kommentar har postats!', 2000);
            $scope.newComment = false;
            $scope.comment = {};
        }).error(function(err) {
            Materialize.toast('Din kommentar kunde inte postas!', 2000);
        });
    }
});
