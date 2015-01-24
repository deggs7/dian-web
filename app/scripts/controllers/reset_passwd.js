'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller: ResetPasswdCtrl
 * @description
 * # ResetPasswdCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')

    .config(['$stateProvider', function($stateProvider){
        $stateProvider.state('reset_passwd', {
            url: '/reset-passwd/:phone/:captcha',
            templateUrl: 'views/reset_passwd.html',
            controller: 'ResetPasswdCtrl'
        })
    }])

    .controller('ResetPasswdCtrl', ['$scope', '$http', '$modal', '$state', '$stateParams',
        function ($scope, $http, $modal, $state, $stateParams) {

        $scope.change_passwd = function() {
            $http
                .post(config.api_url + '/reset-passwd/', {
                    "new_password1": $scope.password1,
                    "new_password2": $scope.password2,
                    "phone": $stateParams.phone,
                    "captcha": $stateParams.captcha
                })
                .success(function (data, status, headers, config) {
                    var modalInstance = $modal.open({
                        templateUrl: 'return_change_password.html',
                        controller: 'ModalReturnChangePasswdCtrl'
                    });

                    modalInstance.result.then(function (data) {
                        $state.go('login');
                    }, function () {
                    });
                })
                .error(function(data, status, headers, config){

                });
        };
    }])

    .controller('ModalReturnChangePasswdCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){
        $scope.confirm = function() {
            $modalInstance.close();
        }
    }]);
