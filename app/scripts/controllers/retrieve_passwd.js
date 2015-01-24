'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:RetrievePasswdCtrl
 * @description
 * # RetrievePasswdCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('retrieve_passwd', {
                url: '/retrieve-passwd',
                templateUrl: 'views/retrieve_passwd.html',
                controller: 'RetrievePasswdCtrl'
            })
    }])

    .controller('RetrievePasswdCtrl', ['$scope', '$http', '$timeout', '$state', '$modal',
        function ($scope, $http, $timeout, $state, $modal) {
        $scope.username = null;
        $scope.time_left = 0;

        $scope.create_captcha = function(){

            $http({
                method: 'POST',
                url: config.api_url + '/captcha/',
                data: {"phone": $scope.username}
            })
                .success(function (data, status, headers, config) {
                })
                .error(function (data, status, headers, config) {
                    var modalInstance = $modal.open({
                        templateUrl: 'return_create_or_verify_captcha.html',
                        controller: 'ReturnCreateOrVerifyCaptchaCtrl',
                        resolve:  {
                            "info": function(){
                                return data.error;
                            }
                        }
                    })
                        .result.then(function () {

                        }, function () {

                        });
                });

            var time_clock;
            $scope.time_left = 61;
            var fn = function(){
                if (time_clock){
                    $timeout.cancel(time_clock);
                }

                if ($scope.time_left > 0){
                    time_clock = $timeout(fn, 1000, true);
                    $scope.time_left = $scope.time_left - 1;
                }
            };
            fn();
        };

        $scope.retrieve_passwd = function(){
            $http
                .post(config.api_url + '/captcha/', {
                    phone: $scope.username,
                    captcha: $scope.captcha
                })
                .success(function(data, status, headers, config){
                    $state.go("reset_passwd", {
                        phone: $scope.username,
                        captcha: $scope.captcha
                    }, {inherit:false});
                })
                .error(function(error, status, headers, config){
                    var modalInstance = $modal.open({
                        templateUrl: 'return_create_or_verify_captcha.html',
                        controller: 'ReturnCreateOrVerifyCaptchaCtrl',
                        resolve:  {
                            "info": function(){
                                return error.error;
                            }
                        }
                    })
                        .result.then(function () {
                        }, function () {
                        });
                })
        }
        }])

    .controller("ReturnCreateOrVerifyCaptchaCtrl", ['$scope', '$modalInstance', 'info',
        function($scope, $modalInstance, info){
            $scope.info = info;

            $scope.confirm = function(){
                $modalInstance.close();
            }
        }]);
