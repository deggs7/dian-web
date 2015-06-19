'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller: OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the dianApp
 */

angular.module('dianApp')

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('console.order', {
                controller: 'OrderCtrl',
                url: '/order',
                templateUrl: 'views/console_order.html'
            });
    }])

    .filter('table_order_class', [function() {
        return function (order_status_num) {
            return {
                '0': 'success',
                '1': 'confirm',
                '2': 'secondary',
                '3': 'alert'
            }[order_status_num + ''] || 'info';
        };
    }])
    .filter('order_status', [function() {
        return function (order_status_num) {
            return {
                '0': '已下单',
                '1': '待付款',
                '2': '已付款',
                '3': '已取消'
            }[order_status_num + ''] || '未下单';
        };
    }])
    .controller('OrderCtrl', ['$scope', '$http', 'fetch', function($scope, $http, fetch){
        fetch('tables').success(function(data) {
            console.log('fetch tables');
            console.log(data);
            //$scope.tables = data;
            $scope.tables = [{
                order_status: 0
            }, {
                order_status: 1
            }, {
                order_status: 2
            }, {
                order_status: 3
            }, {
                order_status: null
            }]
        });
    }]);

