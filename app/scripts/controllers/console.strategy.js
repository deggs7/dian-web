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

    .controller('StrategyCtrl', ['$scope', '$http', '$modal', '$state', '$stateParams', '$log', 'ui',
        function ($scope, $http, $modal, $state, $stateParams, $log, ui) {
            $http(
                {
                    url: config.api_url + '/reward/list-strategy/',
                    method: 'GET'
                })
                .success(function(data, status, headers, config){
                    $scope.strategies = data;
                });

            $http(
                {
                    url: config.api_url + '/reward/list-reward/',
                    method: 'GET'
                })
                .success(function(data, status, headers, config){
                    $scope.rewards = data;
                });

            $scope.add_reward = function(){
                console.log('ok');
                var reward_new_modalInstance = $modal.open({
                    templateUrl: 'reward_info.html',
                    controller: 'ModalRewardCtrl',
                    resolve: {
                        "reward": null
                    }
                });

                reward_new_modalInstance.result.then(function (data) {
                    $http
                        .post(config.api_url + '/reward/create-reward/', data)
                        .success(function (data, status, headers, config) {
                            $scope.rewards.push(data);
                        })
                        .error(function (data, status, headers, config) {
                        });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.edit_reward = function(reward){
                var reward_modalInstance = $modal.open({
                    templateUrl: 'reward_info.html',
                    controller: 'ModalRewardCtrl',
                    resolve: {
                        "reward": function(){
                            return angular.copy(reward);
                        }
                    }
                });

                reward_modalInstance.result.then(function (data) {
                    $http
                        .post(config.api_url + '/reward/update-reward/' + data.id + '/', data)
                        .success(function (data, status, headers, config) {
                            angular.forEach($scope.rewards, function(reward){
                                if (reward.id == data.id){
                                    reward.type = data.type;
                                    reward.content = data.content;
                                }
                            });
                        })
                        .error(function (data, status, headers, config) {
                        });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.delete_reward = function(reward){
                ui.confirm({
                    content: '确认要删除该奖品吗？'
                }).then(function() {
                    $http.post(config.api_url + '/reward/delete-reward/' + reward.id + '/').then(function(res) {
                        $scope.rewards = _.without($scope.rewards, reward);
                    }, function(res) {

                    });

                }, function() {

                });
            };

            $scope.add_strategy = function(){
                var strategy_new_modalInstance = $modal.open({
                    templateUrl: 'strategy_info.html',
                    controller: 'ModalStrategyCtrl',
                    resolve: {
                        "rewards": function(){
                            return $scope.rewards
                        },
                        "strategy": null
                    }
                });

                strategy_new_modalInstance.result.then(function (data) {
                    $http
                        .post(config.api_url + '/reward/create-strategy/', data)
                        .success(function (data, status, headers, config) {
                            $scope.strategies.push(data);
                        })
                        .error(function (data, status, headers, config) {
                        });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.edit_strategy = function(strategy){
                var strategy_modalInstance = $modal.open({
                    templateUrl: 'strategy_info.html',
                    controller: 'ModalStrategyCtrl',
                    resolve: {
                        "rewards": function(){
                            return angular.copy($scope.rewards)
                        },
                        "strategy": function(){
                            return angular.copy(strategy);
                        }
                    }
                });

                strategy_modalInstance.result.then(function (data) {
                    $http
                        .post(config.api_url + '/reward/update-strategy/' + data.id + '/', data)
                        .success(function (data, status, headers, config) {
                            angular.forEach($scope.strategies, function(strategy){
                                if (strategy.id == data.id){
                                    strategy.type = data.type;
                                    strategy.count = data.count;
                                    strategy.reward = data.reward;
                                }
                            });
                        })
                        .error(function (data, status, headers, config) {
                        });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.delete_strategy = function(strategy){
                ui.confirm({
                    content: '确认要删除该奖励策略吗？'
                }).then(function() {
                    $http.post(config.api_url + '/reward/delete-strategy/' + strategy.id + '/').then(function(res) {
                        $scope.strategies = _.without($scope.strategies, strategy);
                    }, function(res) {

                    });

                }, function() {

                });
            };


        }])

    .controller('ModalStrategyCtrl', ['$scope', '$http', '$modal', '$modalInstance', 'strategy', 'rewards',
        function ($scope, $http, $modal, $modalInstance, strategy, rewards) {
            $scope.strategy = strategy;
            $scope.rewards = rewards;

            $scope.strategy_types = [
                {"type": 0, "name": "排队超时"},
                {"type": 1, "name": "游戏"},
                {"type": 2, "name": "图片分享"}
            ];
            $scope.reward_types = [ "消费折扣", "赠送礼物"];
            angular.forEach($scope.rewards, function(reward){
                reward.name = $scope.reward_types[reward.type] + ": " + reward.content;
            });

            if ($scope.strategy == null){
                $scope.strategy = {
                    "type": $scope.strategy_types[0].type,
                    "count": 0,
                    "reward": null
                };
                if ($scope.rewards.length != 0){
                    $scope.strategy.reward = $scope.rewards[0];
                }
            }else{
                angular.forEach($scope.rewards, function(reward){
                    if (reward.id == $scope.strategy.reward.id){
                        $scope.strategy.reward = reward;
                    }
                })
            }


            $scope.confirm = function(){
                $modalInstance.close($scope.strategy);
            };

            $scope.cancel = function(){
                $modalInstance.dismiss();
            };

        }])

    .controller('ModalRewardCtrl', ['$scope', '$http', '$modal', '$modalInstance', 'reward',
        function ($scope, $http, $modal, $modalInstance, reward) {

            $scope.reward_types = [
                {"type": 0, "name": "消费折扣"},
                {"type": 1, "name": "赠送礼物"}
            ];
            $scope.reward = reward;

            if ($scope.reward == null){
                $scope.reward = {
                    "type": $scope.reward_types[0].type,
                    "content": ''
                };
            }

            $scope.confirm = function(){
                $modalInstance.close($scope.reward);
            };

            $scope.cancel = function(){
                $modalInstance.dismiss();
            };
        }]);

