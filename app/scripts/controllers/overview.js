'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('overview', {
                url: '/overview',
                templateUrl: 'views/overview.html',
                controller: 'OverviewCtrl'
            })
    }])


    .controller('OverviewCtrl', ['$scope', '$http', '$cookies', '$state', '$stateParams',
        function ($scope, $http, $cookies, $state, $stateParams) {
        $scope.status_desc = {
            "waiting": "等待就餐",
            "dining": "就餐中",
            "idle": "空闲"
        };
        $http({url: config.api_url + '/restaurant/table/', method: 'GET'})
            .success(function (data, status, headers, config) {
                $scope.tables = data;
            });

        $scope.status_change = function(table, status) {
            $http
                .put(config.api_url + '/restaurant/table/' + table.id + '/', {
                    "status": status
                })
                .success(function (data, status, headers, config) {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                })
                .error(function (data, status, headers, config) {
                });
        };
    }]);
