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

    .controller('TableCtrl', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
        $http({
            url: config.api_url + '/table/table-type/',
            method: 'GET'
        })
        .success(function(data, status, headers, config){
            $scope.table_types = data;
        });

        $http({
            url: config.api_url + '/table/list-table/',
            method: 'GET'
        })
        .success(function(data, status, headers, config){
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

