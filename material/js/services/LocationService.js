var module = angular.module('writer.services');

module.factory('LocationService', function($http) {
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
        }
    }
});
