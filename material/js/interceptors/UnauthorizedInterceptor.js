var module = angular.module('writer.interceptors');

module.factory('UnauthorizedInterceptor', ['$q', '$injector', function($q, $injector) {
    var unauthorizedInterceptor = {
        responseError: function(response) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('userID');
                $injector.get('$state').transitionTo('base.admin.login');
            }
            return $q.reject(response);
        }
    };
    return unauthorizedInterceptor;
}]);
