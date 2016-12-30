var module = angular.module('writer.controllers');

module.controller('NewPostCtrl', function($scope, $stateParams, $timeout, CategoryService, LocationService, PostService, ImageService, $facebook) {
    $scope.images = [];
    $scope.share = { fb: false, twitter: false };
    $scope.post = { categories: [], location: "" };
    $scope.placesButtonText = 'Hämta platser igen';
    $scope.fetchPlacesFromFB = true;
    $scope.locationError = false;
    $scope.customLocation = {};

    $('ul.tabs').tabs();
    $('.modal').modal();

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

    $scope.fetchLocation = function() {
        $scope.fetchingPlaces = true;
        LocationService.getCurrentLocation().then(function(response) {
            $scope.customLocation.latitude = response.latitude;
            $scope.customLocation.longitude = response.longitude;
            $scope.fetchingPlaces = false;
            $scope.locationError = false;
        }, function(err) {
            console.log(err);
            $scope.locationError = true;
            $scope.fetchingPlaces = false;
        });
    }

    $scope.fetchFBPlaces = function() {
        $scope.fetchingPlaces = true;
        LocationService.findNearbyFBPlaces().then(function(response) {
            var places = {};
            $scope.fbPlaces = {};
            angular.forEach(response.data, function(place) {
                places[place.name] = null;
                $scope.fbPlaces[place.name] = place;
            });

            $scope.fetchingPlaces = false;
            $('input.autocomplete').autocomplete({
                data: places
            });
            $scope.locationError = false;
        }, function(err) {
            Materialize.toast('Kunde inte hämta platser!', 2000);
            $scope.locationError = true;
            console.log(err);
            $scope.fetchingPlaces = false;
        });
    }
    // Do on load
    $scope.fetchFBPlaces();

    $scope.retryPlacesFetching = function() {
        $scope.social.fb.authenticated ? $scope.fetchFBPlaces() : $scope.fetchLocation()
    }

    $scope.$watch('fetchPlacesFromFB', function(newVal, oldVal) {
        if (newVal != oldVal && !newVal) {
            $scope.fetchLocation();
        } else if (newVal != oldVal && newVal) {
            $scope.fetchFBPlaces();
        }
    });

    $scope.submitPost = function() {
        $scope.uploadingPost = true;
        $('#createPostModal').modal('open');
        var post = { title: $scope.post.title, content: $scope.post.content, images: $scope.images,
            author: localStorage.getItem('userID'), categories: $scope.post.categories,
            youtube: $scope.post.youtube };

            post.location = {};

            if ($scope.fetchPlacesFromFB) {
                if ($scope.fbPlaces) {
                    var fbPlace = $scope.fbPlaces[$('#fbLocationInput').val()]
                    if (fbPlace.location && fbPlace.name) {
                        post.location = {
                            latitude: fbPlace.location.latitude,
                            longitude: fbPlace.location.longitude,
                            name: fbPlace.name,
                        };
                    } else {
                        post.location = null;
                    }
                } else {
                    post.location = null;
                }
            } else {
                if ($scope.customLocation.longitude && $scope.customLocation.latitude) {
                    post.location = {
                        name: $scope.customLocation.name,
                        latitude: $scope.customLocation.latitude,
                        longitude: $scope.customLocation.longitude
                    };
                } else {
                    post.location = null;
                }
            }

            // Know where post is created
            post.postToTwitter = $scope.share.twitter;

            PostService.createPost(post).success(function(response) {
                $scope.post = {};
                $scope.images = [];

                // Share post to FB
                if ($scope.share.fb) {
                    // Share post to FB
                    var payload = {
                        link: window.location.origin + '/posts/' +
                        response.year + '/' + response.month + '/' + response.slug
                    };

                    // Attach FB place when publishing post
                    if ($scope.fetchPlacesFromFB && post.location && post.location.id) {
                        payload.place = post.location.id;
                    }

                    $facebook.api('/me/feed', 'post', payload).then(function(response) {
                        $scope.uploadingPost = false;
                    }, function(err) {
                        console.log(err);
                        $scope.uploadingPost = false;
                    });
                } else {
                    $scope.uploadingPost = false;
                }
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
