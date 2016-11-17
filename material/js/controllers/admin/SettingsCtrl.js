var module = angular.module('writer.controllers');

module.controller('SettingsCtrl', function($rootScope, $scope, SettingsService) {
    $scope.loading = true;
    $rootScope.settings = {};

    SettingsService.getAllSettings().success(function(response) {
        angular.forEach(response, function(setting) {
            if (setting.value === 'true') {
                $rootScope.settings[setting.key] = true;
            } else if (setting.value === 'false') {
                $rootScope.settings[setting.key] = false;
            } else {
                $rootScope.settings[setting.key] = setting.value;
            }
        });
        $scope.loading = false;
    }).error(function(err) {
        $scope.loading = false;
    });

    $scope.saveSetting = function(key) {
        SettingsService.set(key, $rootScope.settings[key]).success(function(response) {
            Materialize.toast('Sparat!', 2000);
        }).error(function(err) {
            Materialize.toast('Kunde inte spara.', 2000);
        });
    }
});
