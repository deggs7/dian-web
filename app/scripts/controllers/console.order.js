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
                    '1': 'primary',
                    '2': 'info',
                    '3': 'alert'
                }[order_status_num + ''] || 'secondary';
            };
        }
    ])
    .filter('order_time', [function() {
        return function(order_time_utc) {//2015-03-21T00:00:00Z
            return extractTime(order_time_utc);

            function extractTime (utc_time) {
                return angular.isString(utc_time) ?
      (utc_time.match(/(.*)T([^Z]*)/)[1] + ' ' + utc_time.match(/(.*)T([^Z]*)/)[2]) : '';
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
                    '3': '已退回'
                }[order_status_num + ''] || '未下单';
            };
        }
    ])

.controller('ModalTableOrderCtrl', ['$http', '$modalInstance', '$scope', 'fetch', 'table',
    function($http, $modalInstance, $scope, fetch, table) {
        console.log('table info');
        console.log(table);
        $http.get(config.api_url + '/table/get-table-detail/' + table.id + '/').then(function(res) {
            var data = res.data;
            console.log('get table detail');
            console.log(data);
            $scope.table = data;//data is an order instance
            if ($scope.table.order) {
              $scope.table.total_price = _.reduce($scope.table.order.order_items, function(memo, item) {
                return (memo + parseInt(item.price) * item.count);
              }, 0);
            } else {
              $scope.table.total_price = 0;
            }
        }, function(data) {
            console.warn('get table detail error');
            console.log(data);
        });

        /* 目前不需要table-type详细信息
        fetch('table-type').get({id: table['table_type']}, function(ty) {
            $scope.table_type = ty;
        });
        */
        $scope.rejectOrder = function(id) {
            $http.get(config.api_url + '/trade/reject-order/' + id + '/').then(function(res) {//here table is an order, actually
                console.log('confirm order');
                console.log(res.data);
                $scope.table.order = res.data;
            }, function(data) {
                console.warn('reject order error');
                console.log(data);
            });
            //$scope.table.status = 3;//for debug
        };
        $scope.finish_order = function(id) {
            $http.get(config.api_url + '/trade/finish-order/' + id + '/').then(function(res) {//here table is an order, actually
                console.log('finish order');
                console.log(res.data);
                $scope.table.order = res.data;
            }, function(res) {
                console.warn('finish order error');
                console.log(res);
            });
        };

        $scope.confirmOrder = function(id) {
            $http.get(config.api_url + '/trade/confirm-order/' + id + '/').then(function(res) {//here table is an order, actually
                console.log('confirm order');
                console.log(res.data);
                $scope.table.order = res.data;
            }, function(res) {
                console.warn('confirm order error');
                console.log(res);
            });
        };

        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }
])

.controller('OrderCtrl', ['$modal', '$scope', '$http', 'fetch', '$timeout',
  function($modal, $scope, $http, fetch, $timeout) {
    var fetchData = function () {
      fetch('tables').success(function(data) {
        console.log('fetch tables');
        $scope.tables = data;
      });
    };
    fetchData();

    // 定时刷新器
    var refresh_info = function(){
      $timeout.cancel($scope.refresh);
      fetchData();
      $scope.refresh = $timeout(refresh_info, config.interval);
    };
    $scope.refresh = $timeout(refresh_info, config.interval);

    // 记得销毁
    $scope.$on('$destroy', function(){
      $timeout.cancel($scope.refresh);
    });

    $scope.table_order = table_order;

    function table_order(table) {
      console.log('talbe order');
      var modalInstance = $modal.open({
        templateUrl: 'table_order.html',
        controller: 'ModalTableOrderCtrl',
        resolve: {
          table: function() {
            return table;
          }
        }
      });
      modalInstance.result.then(function (data) {
      }, function () {
        fetchData();
      });
    };

  }
]);

