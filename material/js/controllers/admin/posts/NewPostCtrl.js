var module = angular.module('writer.controllers');

module.controller('NewPostCtrl', function($scope, $stateParams, $timeout, CategoryService, LocationService, PostService, ImageService) {
    $scope.images = [];
    $scope.post = { categories: [], location: "" };
    $scope.placesButtonText = 'Hämta platser igen';

    $('ul.tabs').tabs();
    $('.modal-trigger').leanModal();

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

    $scope.loadingCategories = true;
    CategoryService.getAllCategories().success(function(response) {
        $scope.categories = response;
        $scope.loadingCategories = false;
    }).error(function(err) {
        Materialize.toast('Kunde inte hämta kategorier!', 2000);
        $scope.loadingCategories = false;
        console.log(err);
    });

    $scope.removePhoto = function(index) {
        $scope.images.splice(index, 1);
    }

    $scope.renderingImages = true;
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
                            $scope.$apply($scope.images.push(rotatedImage));
                            $scope.renderingImages = false;
                        });
                    } else {
                        $scope.images.push(this.result);
                        $scope.renderingImages = false;
                    }
                }

                reader.readAsDataURL(file);
            })
        }
    }

    $scope.submitPost = function() {
        $scope.uploadingPost = true;
        $('#createPostModal').openModal();
        var post = { title: $scope.post.title, content: $scope.post.content, images: $scope.images,
            author: localStorage.getItem('userID'), categories: $scope.post.categories };

            if ($scope.post.location != null && $scope.post.location != "") {
                for (var i = 0; i < $scope.nearbyPlaces.length; i++) {
                    var place = $scope.nearbyPlaces[i];
                    if (place.place_id == $scope.post.location) {
                        post.location = place;
                        break;
                    }
                }
            }

            PostService.createPost(post).success(function(response) {
                $scope.post = {};
                $scope.images = [];
                $scope.uploadingPost = false;
            }).error(function(err) {
                console.log(err);
                $scope.uploadError = true;
                $scope.uploadingPost = false;
            });
        }

        $scope.toggleCategory = function(id) {
            var index = $scope.post.categories.indexOf(id);
            if (index !== -1) {
                $scope.post.categories.splice(index, 1);
            } else {
                $scope.post.categories.push(id);
            }
        }
    });
