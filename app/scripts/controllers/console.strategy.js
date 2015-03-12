'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:StrategyCtrl
 * @description
 * # StrategyCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('console.strategy', {
                url: '/strategy',
                templateUrl: 'views/console_strategy.html',
                controller: 'StrategyCtrl'
            })
    }])

    .controller('StrategyCtrl', ['$scope', '$http', '$modal', '$state', '$stateParams', '$log',
        function ($scope, $http, $modal, $state, $stateParams, $log) {
        $http(
            {
                url: config.api_url + '/restaurant/strategy/',
                method: 'GET'
            })
            .success(function(data, status, headers, config){
                $scope.strategies = data;
        });

        $scope.add = function(){
            var strategy_new_modalInstance = $modal.open({
                templateUrl: 'strategy_info.html',
                controller: 'ModalStrategyCtrl',
                resolve: {
                    "strategy": null
                }
            });

            strategy_new_modalInstance.result.then(function (data) {
                $http
                    .post(config.api_url + '/restaurant/strategy/', data)
                    .success(function (data, status, headers, config) {
                        $scope.strategies.push(data);
                    })
                    .error(function (data, status, headers, config) {
                    });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.modify = function(strategy){
            var strategy_modify_modalInstance = $modal.open({
                templateUrl: 'strategy_info.html',
                controller: 'ModalStrategyCtrl',
                resolve: {
                    "strategy": function(){
                        return strategy;
                    }
                }
            });

            strategy_modify_modalInstance.result.then(function (data) {
                $http
                    .put(config.api_url + '/restaurant/strategy/' + data.id + '/', data)
                    .success(function (data, status, headers, config) {
                    })
                    .error(function (data, status, headers, config) {
                    });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };

        $scope.del = function(strategy){
            $http
                .delete(config.api_url + '/restaurant/strategy/' + strategy.id + '/')
                .success(function(data, status, headers, config){
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                })
                .error(function(data, status, headers, config){

                })
        }

    }])

    .controller('ModalStrategyCtrl', ['$scope', '$http', '$modal', '$modalInstance', 'strategy',
        function ($scope, $http, $modal, $modalInstance, strategy) {
            $scope.reward_types = [
                        {
                            "type": "gift",
                            "name": "赠送礼物"
                        },
                        {
                            "type": "discount",
                            "name": "消费折扣"
                        }
                    ];
            $scope.strategy = strategy;

            if ($scope.strategy == null){
                $scope.strategy = {
                    "reward_type": $scope.reward_types[0].type,
                    "reward_info": '',
                    "time_wait": null
                };
            }

            $scope.confirm = function(){
                $modalInstance.close($scope.strategy);
            };

            $scope.cancel = function(){
                $modalInstance.dismiss();
            };
        }]);
