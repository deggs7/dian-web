'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')
    .config(['$stateProvider', function($stateProvider){
        $stateProvider.state('registration', {
            url: '/registration',
            templateUrl: 'views/registration.html',
            controller: 'RegistrationCtrl'
        })
    }])
    .controller('RegistrationCtrl', ['$scope', '$http', '$modal', function ($scope, $http, $modal) {
        $scope.my_form = {
            "table_type": null,
            "phone": null
        };

        $http({url: config.api_url + '/restaurant/table-type-details/', method: 'GET'})
            .success(function(data, status, headders, config){
                $scope.table_types = data;
                if ($scope.table_types){
                    $scope.my_form.table_type = $scope.table_types[0];
                }
            });

        $scope.register = function(){
            $http
                .post(config.api_url + '/registration/registration/', {
                    "table_type": $scope.my_form.table_type.id,
                    "phone": $scope.my_form.phone
                })
                .success(function (data, status, headers, config) {
                    var modalInstance = $modal.open({
                        templateUrl: 'return_registration.html',
                        controller: 'ModalReturnRegCtrl',
                        resolve: {
                            "registration": function(){
                                return data;
                            },
                            "restaurant": function(){
                                return $scope.restaurant;
                            }
                        }
                    });

                    modalInstance.result.then(function (data) {
                    }, function () {
                    });

                })
                .error(function (data, status, headers, config) {
                });
        }

    }])

    .controller('ModalReturnRegCtrl', ['$scope', '$http', '$modalInstance', 'registration', 'restaurant',
        function ($scope, $http, $modalInstance, registration, restaurant) {
            $scope.registration = registration;
            $scope.restaurant = restaurant;
            $http({
                url: config.api_url + '/restaurant/table-type/' + $scope.registration.table_type + '/',
                method: 'GET'
            })
                .success(function(data, status, headers, config){
                    $scope.table_type = data;
                })
                .error(function (data, status, headers, config) {
                });

            $scope.close = function(){
                $modalInstance.close();
            }
    }]);
