var module = angular.module('writer.controllers');

module.controller('AdminPostDetailCtrl', function($scope, $state, $stateParams, CategoryService, PostService, ImageService, LocationService) {
    $scope.loading = true;
    $scope.placesButtonText = 'Hämta platser igen';

    $('.modal').modal();
    $('ul.tabs').tabs();

    $scope.removePhoto = function(index) {
        $scope.post.images.splice(index, 1);
    }

    $scope.fetchPlaces = function() {
        $scope.placesButtonText = 'Hämtar platser ...';
        LocationService.getCurrentLocation().then(function(location) {
            var geocoder = new google.maps.Geocoder;
            var latLng = {
                lat: location.latitude,
                lng: location.longitude
            }

            geocoder.geocode({'location': latLng}, function(results, status) {
                $scope.$apply($scope.nearbyPlaces = results);
            });
            $scope.placesButtonText = 'Hämta platser igen';
        }).catch(function(err) {
            console.log(err);
            $scope.placesButtonText = 'Hämta platser igen';
            Materialize.toast('Kunde inte hämta platser!', 2000);
        });
    }

    $scope.fetchPlaces();

    $scope.renderImages = function(event) {
        $scope.renderingImages = true;
        if (event) {
            angular.forEach(event.target.files, function(file) {
                var reader = new FileReader();
                var img = new Image();

                reader.onload = function(e) {
                    // Only reorient iPhone portrait for now
                    if (ImageService.getOrientation(this.result) == 6) {
                        ImageService.rotate(this.result, 90).then(function(rotatedImage) {
                            $scope.$apply($scope.post.images.push(rotatedImage));
                            $scope.renderingImages = false;
                        });
                    } else {
                        $scope.post.images.push(this.result);
                        $scope.renderingImages = false;
                    }
                }

                reader.readAsDataURL(file);
            })
        }
    }

    $scope.updatePost = function() {
        $('#updatePostModal').modal();
        $scope.uploadingPost = true;

        // Check if post location has changed
        if ($scope.post.newLocation) {
            for (var i = 0; i < $scope.nearbyPlaces.length; i++) {
                var place = $scope.nearbyPlaces[i];
                if (place.place_id == $scope.post.newLocation) {
                    $scope.post.location = place;
                    break;
                }
            }
        }

        PostService.updatePost($scope.post).success(function(response) {
            $scope.uploadingPost = false;
            $scope.updateSuccess = true;
        }).error(function(err) {
            console.log(err);
            $scope.uploadingPost = false;
            $scope.updateSuccess = false;
            Materialize.toast('Inlägget kunde inte uppdateras!', 2000);
        });
    }

    $scope.deletePost = function() {
        PostService.deletePost($scope.post._id).success(function(response) {
            Materialize.toast('Inlägget är raderat!', 2000);
            $state.go('base.admin.posts');
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Inlägget kunde inte raderas!', 2000);
        });
    }

    CategoryService.getAllCategories().success(function(response) {
        $scope.categories = response;
    }).error(function(err) {
        console.log(err);
    });

    PostService.getPostByID($stateParams.id).success(function(response) {
        $scope.post = response;
        angular.forEach($scope.post.categories, function(category, index) {
            $scope.post.categories[index] = category._id;
        });
        $scope.loading = false;
    }).error(function(err) {
        $scope.post = {};
        $scope.loading = false;
        console.log(err);
    });

    $scope.toggleCategory = function(id) {
        var index = $scope.post.categories.indexOf(id);
        if (index !== -1) {
            $scope.post.categories.splice(index, 1);
        } else {
            $scope.post.categories.push(id);
        }
    }
});
