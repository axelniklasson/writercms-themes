var module = angular.module('writer.services');

module.factory('ImageService', function($http) {
    return {
        getOrientation: function(base64) {
            if (this.getImageType(base64) === 'jpg' || this.getImageType(base64) === 'jpeg') {
                var exif = piexif.load(base64);
                return exif["0th"][piexif.ImageIFD.Orientation];
            }
            return false;
        },
        getImageType: function(base64) {
            return base64.split(';')[0].split(':')[1].split('/')[1];
        },
        rotate: function(base64, degrees) {
            var promise = new Promise(
                function(resolve, reject) {
                    var image = new Image();
                    image.src = base64;
                    image.onload = function() {
                        var ratio = image.width / image.height;
                        var canvas = document.createElement('canvas');
                        document.body.appendChild(canvas);
                        var ctx = canvas.getContext("2d");

                        canvas.width = image.height;
                        canvas.height = image.width;
                        ctx.clearRect(0, 0 , canvas.width, canvas.height);
                        ctx.save();
                        ctx.translate(canvas.width / 2, canvas.height / 2);
                        ctx.rotate(90 * Math.PI/180);
                        ctx.drawImage(image, -canvas.height / 2, -canvas.width / 2, image.width, image.height);
                        ctx.restore();

                        resolve(canvas.toDataURL());
                    }
                }
            );

            return promise;
        }
    }
});
