var module = angular.module('writer.filters');

module.filter('prettyDate', function() {
    return function(dateString) {
        return moment(dateString).format('LLLL');
    }
});

module.filter('prettyDateShort', function() {
    return function(dateString) {
        return moment(dateString).format('LLL');
    }
});

module.filter('shortDate', function() {
    return function(dateString) {
        return moment(dateString).fromNow(true);
    }
});

module.filter('timeSince', function() {
    return function(dateString) {
        return moment(dateString).toNow(true);
    }
});
