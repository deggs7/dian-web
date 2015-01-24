'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:ChangePasswdCtrl
 * @description
 * # ChangePasswdCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('console.change_passwd', {
                url: '/change-passwd',
                templateUrl: 'views/console_change_passwd.html',
                controller: 'ChangePasswdCtrl'
            })
    }])

    .controller('ChangePasswdCtrl', ['$scope', '$http', '$modal', '$state', function ($scope, $http, $modal, $state) {

        $scope.change_passwd = function() {
            $http
                .put(config.api_url + '/account/password/', {
                    "new_password1": $scope.password1,
                    "new_password2": $scope.password2
                })
                .success(function (data, status, headers, config) {
                    var modalInstance = $modal.open({
                        templateUrl: 'return_change_password.html',
                        controller: 'ModalReturnChangePasswdCtrl'
                    });

                    modalInstance.result.then(function (data) {
                        $state.go('^.overview');
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