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
            "phone": ""
        };

        $http({url: config.api_url + '/restaurant/table-type-registration/', method: 'GET'})
            .success(function(data, status, headers, config){
                $scope.table_type_regs = data;
            });

        $http({url: config.api_url + '/restaurant/table-type/', method: 'GET'})
            .success(function(data, status, headders, config){
                $scope.table_types = data;
                angular.forEach($scope.table_types, function(ttype) {
                    ttype['slug'] = ttype.name + "（" + ttype.min_seats + "-" + ttype.max_seats + "人）";
                });
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

    .controller('ModalReturnRegCtrl', ['$scope', '$modalInstance', 'registration',
        function ($scope, $modalInstance, registration) {
            $scope.registration = registration;
    }]);
