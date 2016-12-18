var module = angular.module('writer.services');

module.factory('LocalStorageService', function() {
    return {
        markPostAsLiked: function(id) {
            var rawArr = localStorage.getItem('likedPosts');
            rawArr != null ? likedPosts = JSON.parse(rawArr) : likedPosts = [];
            likedPosts.push(id);
            localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
        },
        hasLikedPost: function(id) {
            var rawArr = localStorage.getItem('likedPosts');
            rawArr != null ? likedPosts = JSON.parse(rawArr) : likedPosts = [];
            return likedPosts.indexOf(id) != -1;
        },
        exists: function(key) {
            return localStorage.getItem(key) !== null;
        },
        set: function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        clear: function(key) {
            localStorage.removeItem(key);
        }
    }
});
