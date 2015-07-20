'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:ConsoleExchangeCtrl
 * @description
 * # ConsoleExchangeCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')
    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('console.exchange', {
                    controller: 'ExchangeCtrl',
                    url: '/exchange',
                    templateUrl: 'views/console_exchange.html'
                });
        }
    ])
    .controller('ExchangeCtrl', ['$scope', '$http', '$modal', '$log', 'ui', function ($scope, $http, $modal, $log, ui) {

        $scope.coupon_code = "";
        $scope.coupon_is_invalid = false;
        $scope.coupon = null;

        $scope.submit_coupon_code = function(){
            var data = {"coupon_code": $scope.coupon_code};
            $http
                .post(config.api_url + '/reward/get-coupon-by-code/', data)
                .success(function (data, status, headers, config) {
                    $scope.coupon = data;
                })
                .error(function (data, status, headers, config) {
                    $scope.coupon_is_invalid = true;
                });
        };

        $scope.reset_panel = function(){
            $scope.coupon_is_invalid = false;
            $scope.coupon = null;
        };

        $scope.exchange_coupon = function(){
            $http
                .get(config.api_url + '/reward/exchange-coupon/' + $scope.coupon.id + '/')
                .success(function (data, status, headers, config) {
                    $modal.open({
                        templateUrl: 'exchange_ok.html',
                        controller: 'ModalExchangeOkCtrl'
                    }).result.then(function (cdata) {
                            $scope.coupon = data;
                    });
                })
                .error(function (data, status, headers, config) {
                });
        }
    }])

    .controller('ModalExchangeOkCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){

        $scope.confirm = function(){
            $modalInstance.close();
        };
    }]);
