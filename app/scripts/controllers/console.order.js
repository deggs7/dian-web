'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller: OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the dianApp
 */

angular.module('dianApp')

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('console.order', {
                controller: 'OrderCtrl',
                url: '/order',
                templateUrl: 'views/console_order.html'
            });
    }
])

.filter('table_order_class', [
        function() {
            return function(order_status_num) {
                return {
                    '0': 'success',
                    '1': 'confirm',
                    '2': 'secondary',
                    '3': 'alert'
                }[order_status_num + ''] || 'info';
            };
        }
    ])
    .filter('order_status', [
        function() {
            return function(order_status_num) {
                return {
                    '0': '已下单',
                    '1': '待付款',
                    '2': '已付款',
                    '3': '已取消'
                }[order_status_num + ''] || '未下单';
            };
        }
    ])

.controller('ModalTableOrderCtrl', ['$scope', 'fetch', 'table',
    function($scope, fetch, table) {
        console.log('table detail');
        console.log(table);
        //$scope.table = table;
        $scope.table = mock_table();
        $scope.table.total_price = _.reduce(_.pluck($scope.table.order_items, 'price'), function(memo, num) {
            return (memo + num) * 1;
        }, 0);
        /* 目前不需要table-type详细信息
        fetch('table-type').get({id: table['table_type']}, function(ty) {
            $scope.table_type = ty;
        });
        */

        function mock_table(table) {
            return {
                "id": 1,
                "restaurant": 1,
                "member": 1,
                "create_time": "2015-06-24T16:04:49Z",
                "confirm_time": "2015-06-25T00:05:39Z",
                "pay_time": "2015-06-25T00:05:48Z",
                "status": 0,
                "price": "0.000",
                "order_items": [{
                    "id": 1,
                    "order": 1,
                    "category": "\u9ed8\u8ba4\u5206\u7c7b",
                    "name": "sdfdsf",
                    "img_key": "",
                    "price": "12.000",
                    "unit": "\u4efd",
                    "description": "",
                    "count": 1
                }]
            };
        }
    }
])

.controller('OrderCtrl', ['$modal', '$scope', '$http', 'fetch',
    function($modal, $scope, $http, fetch) {
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
    }
]);

