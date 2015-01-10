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
            });

        $http(
            {
                url: config.api_url + '/restaurant/table-type/',
                method: 'GET'
            })
            .success(function(data, status, headers, config){
                $scope.table_types = data;
                angular.forEach($scope.table_types, function(ttype) {
                    ttype['slug'] = ttype.name + "（" + ttype.min_seats + "-" + ttype.max_seats + "人）";
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
        }
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
