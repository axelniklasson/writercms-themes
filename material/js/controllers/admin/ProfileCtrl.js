var module = angular.module('writer.controllers');

module.controller('ProfileCtrl', function($scope, UserService, ImageService) {
    $scope.loading = true;

    UserService.getProfileData().success(function(response) {
        $scope.user = response;
        $scope.loading = false;
    }).error(function(err) {
        $scope.loading = false;
    })

    $scope.addProfilePic = function() {
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
                    $scope.$apply($scope.user.profilePic = this.result);
                    $scope.$apply($scope.user.updatedPic = true);
                }
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    $scope.updateProfile = function() {

        UserService.updateProfileData($scope.user).success(function(response) {
            Materialize.toast('Din profil är nu uppdaterad!', 2000);
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Din profil kunde inte uppdateras.', 2000);
        });
    }
});
