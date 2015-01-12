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
            .state('table', {
                url: "/table",
                controller: "TableCtrl",
                templateUrl: "views/table.html"
            })

    }])

    .controller('TableCtrl', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
        $scope.tab = [
            {'active': true},
            {'active': false}
        ];

        $http(
            {
                url: config.api_url + '/restaurant/table/',
                method: 'GET'
            })
            .success(function (data, status, headers, config) {
                $scope.tables= data;
                angular.forEach($scope.tables, function(table){
                    table.show_edit = false;
                    table.editing = false;
                    table.changed = false;
                })
            });

        $http(
            {
                url: config.api_url + '/restaurant/table-type/',
                method: 'GET'
            })
            .success(function(data, status, headers, config){
                $scope.table_types = data;
                angular.forEach($scope.table_types, function(table_type){
                    table_type['min'] = {
                        show_edit: false,
                        editing: false,
                    };
                    table_type['max'] = {
                        show_edit: false,
                        editing: false,
                    };

                    table_type.changed = false;
                });
        });

        $scope.add = function(){
            if ($scope.tab[0].active) {
                var table_modalInstance = $modal.open({
                    templateUrl: 'add_table.html',
                    controller: 'ModalAddTableCtrl',
                    resolve: {
                        "table_types": function(){
                            return $scope.table_types;
                        }
                    }
                });

                table_modalInstance.result.then(function (data) {
                    $scope.tables.push(data);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            }else{
                var table_type_modalInstance = $modal.open({
                    templateUrl: 'add_table_type.html',
                    controller: 'ModalAddTableTypeCtrl',
                    resolve: {
                    }
                });

                table_type_modalInstance.result.then(function (data) {
                    $scope.table_types.push(data);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        };

        $scope.mouse_enter_to_td = function(obj) {
            obj.show_edit = true;
        };

        $scope.mouse_leave_from_td = function(obj) {
            obj.show_edit = false;
        };

        $scope.blurSelect= function(evt, table) {
            table.show_edit = false;
            table.editing = false;
            table.table_type = table.table_type_info.id;
        };

        $scope.to_edit = function(table) {
            table.editing = true;
            table.show_edit = false;
            table.changed = true;

            angular.forEach($scope.table_types, function(table_type){
                if (table_type.id == table.table_type){
                    table.table_type_info = table_type;
                }
            });
        };

        $scope.to_edit_min_seats = function(table_type) {
            table_type.min.editing = true;
            table_type.min.show_edit = false;
            table_type.changed = true;
        };

        $scope.to_edit_max_seats = function(table_type) {
            table_type.max.editing = true;
            table_type.max.show_edit = false;
            table_type.changed = true;
        };

        $scope.blurInput = function(evt, table_type) {
            table_type.min.editing = false;
            table_type.min.show_edit = false;

            table_type.max.editing = false;
            table_type.max.show_edit = false;
        };

        $scope.update = function() {
            angular.forEach($scope.tables, function(table){
                if (table.changed) {
                    $http
                        .put(config.api_url + '/restaurant/table/' + table.id + '/', {
                            "table_type": table.table_type
                        })
                        .success(function(data, status, headers, config){
                            // TODO: growl
                        })
                        .error(function(data, status, headers, config){
                            // TODO: growl
                        });

                }
            });

            angular.forEach($scope.table_types, function(table_type){
                if (table_type.changed) {
                    $http
                        .put(config.api_url + '/restaurant/table-type/' + table_type.id + '/', {
                            "min_seats": table_type.min_seats,
                            "max_seats": table_type.max_seats
                        })
                        .success(function(data, status, headers, config){
                            // TODO: growl
                        })
                        .error(function(data, status, headers, config){
                            // TODO: growl
                        });
                }
            });
        };

    }])

    .controller('ModalAddTableCtrl', ['$scope', '$http', '$modal', '$modalInstance', 'table_types',
        function ($scope, $http, $modal, $modalInstance, table_types) {
            $scope.table_types = table_types;
            $scope.table_form = {
                "table_type": $scope.table_types[0],
                "table_number": ""
            };

            $scope.confirm = function(){
                $http
                    .post(config.api_url + '/restaurant/table/', {
                        "table_type": $scope.table_form.table_type.id,
                        "table_number": $scope.table_form.table_number
                    })
                    .success(function (data, status, headers, config) {
                        $modalInstance.close(data);
                    })
                    .error(function (data, status, headers, config) {
                    });
            };

            $scope.cancel = function(){
                $modalInstance.dismiss();
            };
    }])

    .controller('ModalAddTableTypeCtrl', ['$scope', '$http', '$modal', '$modalInstance', function ($scope, $http, $modal, $modalInstance) {
        $scope.type_form = {
            "name": null,
            "min_seats": null,
            "max_seats": null
        };

        $scope.confirm = function(){
            $http
                .post(config.api_url + '/restaurant/table-type/', $scope.type_form)
                .success(function (data, status, headers, config) {
                    data['slug'] = data.name + "（" + data.min_seats + "-" + data.max_seats + "人）";
                    $modalInstance.close(data);
                })
                .error(function (data, status, headers, config) {
                });
        };

        $scope.cancel = function(){
            $modalInstance.dismiss();
            };
    }]);
