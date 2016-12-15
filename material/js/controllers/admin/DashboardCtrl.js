var module = angular.module('writer.controllers');

module.controller('DashboardCtrl', function($scope, DashboardService) {
    $scope.loading = true;

    $scope.pageViewsChart = {
        reportType: 'ga',
        query: {
            metrics: 'ga:pageviews',
            dimensions: 'ga:date',
            'start-date': '7daysAgo',
            'end-date': 'today',
            ids: 'ga:123887215'
        },
        chart: {
            container: 'chart-1-container', // id of the created DOM-element
            type: 'LINE'
        }
    };

    $scope.citiesChart = {
        reportType: 'ga',
        query: {
            metrics: 'ga:pageviews',
            dimensions: 'ga:city',
            ids: 'ga:123887215'
        },
        chart: {
            container: 'chart-3-container',
            type: 'PIE'
        }
    };

    DashboardService.getStatus().success(function(response) {
        $scope.status = response;
        $scope.status.readComments = 0;
        $scope.status.newComments = 0;

        angular.forEach(response.comments, function(value, key) {
            if (value.read) {
                $scope.status.readComments = value.count;
            } else {
                $scope.status.newComments = value.count;
            }
        });

        $scope.loading = false;
    }).error(function(err) {
        console.log(err);
        $scope.loading = false;
    });

    DashboardService.getLastPost().success(function(response) {
        $scope.lastPost = response[0];
    }).error(function(err) {
        console.log(err);
    });

    DashboardService.getStats().success(function(response) {
        $scope.stats = response;
    }).error(function(err) {
        console.log(err);
    });
});
