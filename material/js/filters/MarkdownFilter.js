var module = angular.module('writer.filters');

module.filter('markdown', function() {
    return function(markdown) {
        if (markdown != null && markdown.length > 0) {
            return marked(markdown);
        } else {
            return "";
        }
    }
});
