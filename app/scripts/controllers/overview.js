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

        $http({url: config.api_url + '/restaurant/table-type-details/', method: 'GET'})
            .success(function (data, status, headers, config) {
                $scope.table_types = data;
            });

        $scope.next_reg = function(action, table_type){
            if (action == 'expired' || action == 'passed'){
                // 当前号reg的状态设置
                $http
                    .put(config.api_url + '/registration/registration/' + table_type.current_registration.id + '/', {
                        "status": action
                    })
                    .success(function(data, status, headers, config){
                    })
                    .error(function(data, status, headers, config){
                    });
            }

            // 如果有下一个号，则把下一个号置为turn
            if (table_type.queue_registrations.length){
                var header_reg = table_type.queue_registrations[0];
                $http
                    .put(config.api_url + '/registration/registration/' + header_reg.id + '/', {
                        "status": "turn"
                    })
                    .success(function(data, status, headers, config){
                        header_reg = data;
                        table_type.queue_registrations.shift();
                        table_type.current_registration = header_reg;
                    })
                    .error(function(data, status, headers, config){
                    });
            }else{
                table_type.current_registration = null;
            }

            // TODO 发送短信
        };

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
