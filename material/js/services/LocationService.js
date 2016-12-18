var module = angular.module('writer.services');

module.factory('LocationService', function($http, $facebook) {
    return {
        getCurrentLocation: function() {
            var promise = new Promise(
                function(resolve, reject) {
                    var options = {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    };

                    function success(pos) {
                        resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy });
                    }

                    function error(err) {
                        reject(err);
                    };

                    navigator.geolocation.getCurrentPosition(success, error, options);
                }
            );

            return promise;
        },
        findNearbyFBPlaces: function(query) {
            var self = this;
            var promise = new Promise(
                function(resolve, reject) {
                    self.getCurrentLocation().then(function(location) {
                        $facebook.api('/search?q=' + query + '&center=' + location.latitude + ',' +
                            location.longitude + '&distance=1000&type=place&limit=10').then(function(response) {
                                resolve(response);
                            }, function(err) {
                                reject(err);
                            });
                    }, function(err) {
                        reject(err);
                    });
                }
            );

            return promise;
        }
    }
});
