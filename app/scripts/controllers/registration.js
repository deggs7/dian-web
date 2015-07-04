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

    .controller('RegistrationCtrl', ['$scope', '$http', '$modal', '$timeout',
        function ($scope, $http, $modal, $timeout) {

        var cdn_file_url = config.cdn_file_url;

        // default register type: 1=wp
        $scope.register_type = 1;

        $scope.dial_keys = [
            {name:'1', value:'1'},
            {name:'2', value:'2'},
            {name:'3', value:'3'},
            {name:'4', value:'4'},
            {name:'5', value:'5'},
            {name:'6', value:'6'},
            {name:'7', value:'7'},
            {name:'8', value:'8'},
            {name:'9', value:'9'},
            {name:'清空', value:'clear'},
            {name:'0', value:'0'},
            {name:'删除', value:'del'},
        ];

        var regex = {
            mobile: /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/
        };

        $scope.switch_register_type = function (type) {
          $scope.register_type = type;
        };

        $http({url: config.api_url + '/restaurant/default-restaurant/', method: 'GET'})
            .success(function (data, status, headers, config) {
                $scope.restaurant = data;
                $('div.registration-wrap')
                    .css('background-image', 'url(\'' + cdn_file_url + '/'+ $scope.restaurant.file_key + '\')');
            });

        $http
            .get(config.api_url + '/restaurant/register-qrcode/')
            .success(function (data, status, headers, config) {
              $('div.register-qrcode')
                  .css('background-image', 'url(\'' + cdn_file_url + '/'+ data.file_key + '\')');
            })
            .error(function (data, status, headers, config) {
            });


        $scope.my_form = {
            "table_type": null,
            "phone": ''
        };
        $scope.is_inputting = false;

        $http({url: config.api_url + '/table/table-type-details/', method: 'GET'})
            .success(function(data, status, headders, config){
                $scope.table_types = data;
                if ($scope.table_types){
                    $scope.my_form.table_type = $scope.table_types[0];
                }
                $scope.update_table_types = data;
            });

        // 定时刷新器
        var refresh_info = function(){
            $timeout.cancel($scope.refresh);

            $http({url: config.api_url + '/table/table-type-details/', method: 'GET'})
                .success(function (data, status, headers, config) {
                    $scope.update_table_types = data;
                });

            $scope.refresh = $timeout(refresh_info, config.interval);
        };
        $scope.refresh = $timeout(refresh_info, config.interval);
        // 记得销毁
        $scope.$on('$destroy', function(){
            $timeout.cancel($scope.refresh);
        });

        $scope.in_inputting = function () {
          if (!$scope.is_inputting) {
            $scope.is_inputting = true;
          }
        };

        $scope.touch_key = function (key) {
            if (key.value === 'del') {
                $scope.my_form.phone = $scope.my_form.phone.substring(0, $scope.my_form.phone.length - 1);
            }else if (key.value === 'clear') {
                $scope.my_form.phone = '';
            }else if (key.value === 'ok') {
                $scope.register();
            }else {
                $scope.my_form.phone = $scope.my_form.phone + key.value;
            }
        };

        $scope.$watch('my_form.phone', function () {
            /*
            if ($scope.my_form.phone === '') {
                $('.phone-input').addClass('phone-waiting');
            }else {
                $('.phone-input').removeClass('phone-waiting');
            }
            */
            if ($scope.invalidMobile()) {
                $('.phone-input').addClass('phone-success');
                $('.register-btn').removeClass('disabled');
            }else {
                $('.phone-input').removeClass('phone-success');
                $('.register-btn').addClass('disabled');
            };
        });

        $scope.invalidMobile = function () {
            return regex.mobile.test($scope.my_form.phone);
        }

        $scope.register = function(){
            if (!$scope.invalidMobile()) {
                return;
            };
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
                        $scope.my_form.table_type = $scope.table_types[0];
                        $scope.my_form.phone = '';
                        $scope.is_inputting = false;
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
                url: config.api_url + '/table/table-type/' + $scope.registration.table_type + '/',
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
        }])

