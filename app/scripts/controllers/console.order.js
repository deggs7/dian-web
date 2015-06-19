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

    .controller('ModalTableOrderCtrl', ['$scope', 'table', function($scope, table) {
        $scope.table = table;
    }])

    .controller('OrderCtrl', ['$modal', '$scope', '$http', 'fetch', function($modal, $scope, $http, fetch){
        fetch('tables').success(function(data) {
            console.log('fetch tables');
            console.log(data);
            $scope.tables = data;
            /*
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
            */
        });
        $scope.table_order = table_order;

        function table_order(table) {
            console.log('talbe order');
            $modal.open({
                templateUrl: 'table_order.html',
                controller: 'ModalTableOrderCtrl',
                resolve: {
                    table: function() {
                        return table;
                    }
                }
            });
        }
    }]);

