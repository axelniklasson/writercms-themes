var module = angular.module('writer.controllers');

module.controller('SettingsCtrl', function($rootScope, $scope, SettingsService) {
    $scope.loading = true;
    $rootScope.settings = {};

    SettingsService.getAllSettings().success(function(response) {
        angular.forEach(response, function(settings) {
            $scope.settings[settings.key] = settings.value;
        });
        $scope.loading = false;
    }).error(function(err) {
        $scope.loading = false;
    });

    $scope.saveSetting = function(key) {
        SettingsService.set(key, $scope.settings[key]).success(function(response) {
            Materialize.toast('Sparat!', 2000);
        }).error(function(err) {
            Materialize.toast('Kunde inte spara.', 2000);
        });
    }
});
