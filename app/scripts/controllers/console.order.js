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
    .filter('order_time', [function() {
        return function(order_time_utc) {//2015-03-21T00:00:00Z
            return extractTime(order_time_utc);

            function extractTime (utc_time) {
                return angular.isString(utc_time) ? utc_time.match(/T([^Z]*)Z/)[1] : '';
            }
        };
    }])
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

.controller('ModalTableOrderCtrl', ['$http', '$scope', 'fetch', 'table',
    function($http, $scope, fetch, table) {
        console.log('table info');
        console.log(table);
        //$scope.table = table;
        $http.get(config.api_url + '/table/get-table-detail/' + table.id + '/').then(function(res) {
            var data = res.data;
            console.log('get table detail');
            debugger;
            console.log(data);
            $scope.table = data.order;//data is an order instance
            $scope.table.total_price = _.reduce(_.pluck(
                $scope.table.order_items, 'price'
            ), function(memo, num) {
                return (memo + num) * 1;
            }, 0);
        }, function(data) {
            console.warn('get table detail error');
            console.log(data);
        });
        //$scope.table = mock_table(); //after developing, comment this line

        /* 目前不需要table-type详细信息
        fetch('table-type').get({id: table['table_type']}, function(ty) {
            $scope.table_type = ty;
        });
        */
        $scope.rejectOrder = function(table) {
            $http.get(config.api_url + '/trade/reject-order/' + table.id + '/').then(function(data) {//here table is an order, actually
                console.log('confirm order');
                console.log(data);
                $scope.table.status = 3;//已取消
            }, function(data) {
                console.warn('reject order error');
                console.log(data);
            });
            //$scope.table.status = 3;//for debug
        };
        $scope.finish_order = function(table) {
            $http.get(config.api_url + '/trade/finish-order/' + table.id + '/').then(function(data) {//here table is an order, actually
                console.log('finish order');
                console.log(data);
                $scope.table.status = 2;//已付款
            }, function(data) {
                console.warn('finish order error');
                console.log(data);
            });
            //$scope.table.status = 2;//for debug
        };

        $scope.confirmOrder = function(table) {
            $http.get(config.api_url + '/trade/confirm-order/' + table.id + '/').then(function(data) {//here table is an order, actually
                console.log('confirm order');
                console.log(data);
                $scope.table.status = 1;
            }, function(data) {
                console.warn('confirm order error');
                console.log(data);
            });
            //$scope.table.status = 1;//for debug
        };

        // function mock_table(table) {
        //     return {
        //         "id": 1,
        //         "restaurant": 1,
        //         "member": 1,
        //         "create_time": "2015-06-24T16:04:49Z",
        //         "confirm_time": "2015-06-25T00:05:39Z",
        //         "pay_time": "2015-06-25T00:05:48Z",
        //         "status": 0,
        //         "price": "0.000",
        //         "order_items": [{
        //             "id": 1,
        //             "order": 1,
        //             "category": "\u9ed8\u8ba4\u5206\u7c7b",
        //             "name": "sdfdsf",
        //             "img_key": "",
        //             "price": "12.000",
        //             "unit": "\u4efd",
        //             "description": "",
        //             "count": 1
        //         }]
        //     };
        // }
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

