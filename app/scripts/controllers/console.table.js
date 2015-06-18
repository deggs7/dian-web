'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')
    .config(["$stateProvider", function($stateProvider){
        $stateProvider
            .state('console.table', {
                url: "/table",
                controller: "TableCtrl",
                templateUrl: "views/console_table.html"
            })

    }])

    .controller('TableCtrl', ['$scope', '$http', '$modal', '$log','ui', 'fetch', function ($scope, $http, $modal, $log, ui, fetch) {
        $http({
            url: config.api_url + '/table/table-type/',
            method: 'GET'
        })
        .success(function(data, status, headers, config){
            $scope.table_types = data;
        });

        fetch('tables').success(function(data, status, headers, config){
            $scope.tables = data;
        });

        $scope.add_table = function() {
            var table_modalInstance = $modal.open({
                templateUrl: 'add_table.html',
                controller: 'ModalAddTableCtrl',
                resolve: {
                    table_types: function() {
                        return $scope.table_types;
                    }
                }
            });
            table_modalInstance.result.then(function(table) {
                $http.post(config.api_url + '/table/create-table/', table).then(function(res) {
                    console.log('create table');
                    console.log(res.data);
                    $scope.tables = $scope.tables.concat(angular.isArray(res.data) ? res.data : [res.data]);
                }, function(res) {
                    console.error('create table error');
                });

            });
        };

        //use to add table type
        $scope.add = function(){
            var table_type_modalInstance = $modal.open({
                templateUrl: 'add_table_type.html',
                controller: 'ModalAddTypeCtrl',
                resolve: {
                    table_types: function() {
                        return $scope.table_types;
                    }
                }

            });

            table_type_modalInstance.result.then(function (data) {
                $http
                    .post(config.api_url + '/table/table-type/', data)
                    .success(function (data, status, headers, config) {
                        $scope.table_types.push(data);
                    })
                    .error(function (data, status, headers, config) {
                    });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.edit = function(table_type) {
            var table_type_modalInstance = $modal.open({
                templateUrl: 'add_table_type.html',
                controller: 'ModalEditTableTypeCtrl',
                resolve: {
                    "table_type": function(){
                        return angular.copy(table_type);
                    }
                }
            });

            table_type_modalInstance.result.then(function (data) {
                $http
                    .put(config.api_url + '/table/table-type/' + data.id + '/', data)
                    .success(function (data, status, headers, config) {
                        angular.forEach($scope.table_types, function(table_type){
                            if (table_type.id == data.id){
                                table_type.name = data.name;
                                table_type.min_seats = data.min_seats;
                                table_type.max_seats = data.max_seats;
                            }
                        });
                    })
                    .error(function (data, status, headers, config) {
                    });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.edit_table = function(table) {
            var table_modalInstance = $modal.open({
                templateUrl: 'add_table.html',
                controller: 'ModalEditTableCtrl',
                resolve: {
                    table_types: function() {
                        return $scope.table_types;
                    },
                    table: function() {
                        return table;
                    }
                }
            });

            table_modalInstance.result.then(function(table) {
                $http.post(config.api_url + '/table/update-table/' + table.id + '/').then(function(res) {
                    console.log('edit table');
                    console.log(res.data);
                }, function(res) {

                });

            });
        };

        $scope.del_table_type = function(table_type){
             ui.confirm({
                 content: '确认要删除该餐桌类型吗？'
             }).then(function() {
                 $http.delete(config.api_url + '/table/table_type/' + table_type.id + '/').then(function(res) {
                     console.log('del table type');
                     console.log(res.data);
                 }, function(res) {

                 });

             }, function() {

             });

            /*
            product_del_modal_instance.result.then(function () {
                return $http
                    .get(config.api_url + '/menu/delete-product/' + product.id + '/');
            }).then(function() {
              console.log('del_product ok');
              $scope.category_products = _.filter($scope.category_products, function(p) {
                return p.id !== product.id;
              });

            }, function() {
              console.error('del_product error');
            });
            */
        };

        $scope.del_table = function(table){
             ui.confirm({
                 content: '确认要删除该餐桌吗？'
             }).then(function() {
                 $http.get(config.api_url + '/table/delete-table/' + table.id + '/').then(function(res) {
                     console.log('del table');
                     console.log(res.data);
                     $scope.tables = _.without($scope.tables, table);
                 }, function(res) {

                 });

             }, function() {

             });

            /*
            product_del_modal_instance.result.then(function () {
                return $http
                    .get(config.api_url + '/menu/delete-product/' + product.id + '/');
            }).then(function() {
              console.log('del_product ok');
              $scope.category_products = _.filter($scope.category_products, function(p) {
                return p.id !== product.id;
              });

            }, function() {
              console.error('del_product error');
            });
            */
        };
    }])

    .controller('ModalAddTypeCtrl', ['$scope', '$http', '$modal', '$modalInstance', 'table_types',  function ($scope, $http, $modal, $modalInstance, table_types) {
         $scope.type_form = {
            "name": null,
            "min_seats": null,
            "max_seats": null
        };

        $scope.confirm = function(){
            $modalInstance.close($scope.type_form);
        };

        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }])

    .controller('ModalAddTableCtrl', ['$scope', '$http', '$modal', '$modalInstance', 'table_types',  function ($scope, $http, $modal, $modalInstance, table_types) {
        var table_type;

        $scope.table = {};
        $scope.table_types = table_types;
        $scope.table.table_type = (table_type = $scope.table_types[0]) && table_type.name || null;

        $scope.confirm = function(){
            $modalInstance.close($scope.table);
        };

        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }])

    .controller('ModalEditTableCtrl', ['$scope', '$http', '$modal', '$modalInstance', 'table_types', 'table', function ($scope, $http, $modal, $modalInstance, table_types, table) {
        var table_type;

        $scope.table_types = table_types;
        $scope.table = table;

        $scope.confirm = function(){
            $modalInstance.close($scope.table);
        };

        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }])

    .controller('ModalEditTableTypeCtrl', ['$scope', '$http', '$modal', '$modalInstance', 'table_type',
        function ($scope, $http, $modal, $modalInstance, table_type) {
            console.log(table_type);
            $scope.type_form = table_type;

            $scope.confirm = function(){
                $modalInstance.close($scope.type_form);
            };

            $scope.cancel = function(){
                $modalInstance.dismiss();
            };
        }])

