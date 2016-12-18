var module = angular.module('writer.controllers');

module.controller('ProfileCtrl', function($scope, UserService, ImageService, SocialService, $facebook) {
    $scope.loading = true;

    UserService.getProfileData().success(function(response) {
        $scope.user = response;
        $scope.loading = false;
    }).error(function(err) {
        $scope.loading = false;
    })

    $scope.addProfilePic = function(event) {
        if (event) {
            var reader = new FileReader();
            var img = new Image();

            reader.onload = function(e) {
                // Only reorient iPhone portrait for now
                if (ImageService.getOrientation(this.result) == 6) {
                    ImageService.rotate(this.result, 90).then(function(rotatedImage) {
                        $scope.$apply($scope.user.profilePic = rotatedImage);
                        $scope.$apply($scope.user.updatedPic = true);
                    });
                } else {
                    $scope.user.profilePic = this.result;
                    $scope.user.updatedPic = true;
                }
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    $scope.fbLogIn = function() {
        $facebook.login().then(function() {
            SocialService.getFacebookUserData();
        });
    }

    $scope.fbLogOut = function() {
        $facebook.logout().then(function(response) {
            SocialService.removeStashedFacebookUser();
        }, function(err) {
            console.log(err);
        });
    }

    $scope.updateProfile = function() {
        $scope.saving = true;
        $('#savingProfileModal').openModal();

        UserService.updateProfileData($scope.user).success(function(response) {
            $scope.saving = false;
            $scope.savingError = false;
        }).error(function(err) {
            console.log(err);
            $scope.saving = false;
            $scope.savingError = true;
        });
    }
});
