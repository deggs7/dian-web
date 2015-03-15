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
                        // 需给编辑表单传递原值的copy，不然修改后，取消编辑时，原值的显示也会跟着变
                        return angular.copy(strategy);
                    }
                }
            });

            strategy_modify_modalInstance.result.then(function (data) {
                $http
                    .put(config.api_url + '/restaurant/strategy/' + data.id + '/', data)
                    .success(function (rt_data, status, headers, config) {
                      // 对原对象进行修改
                      strategy.time_wait = data.time_wait;
                      strategy.reward_type = data.reward_type;
                      strategy.reward_info = data.reward_info;
                    })
                    .error(function (rt_data, status, headers, config) {
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
