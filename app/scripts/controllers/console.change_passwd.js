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

    .controller('ChangePasswdCtrl', ['$scope', '$http', '$modal', '$state', '$stateParams', function ($scope, $http, $modal, $state, $stateParams) {

        $scope.change_passwd = function() {
            $http
                .put(config.api_url + '/account/password/', {
                    "old_password": $scope.old_password,
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
                    if (status == 403){
                        var modalInstance = $modal.open({
                            templateUrl: 'change_password_error.html',
                            controller: 'ModalChangePasswdErrorCtrl'
                        });

                        modalInstance.result.then(function (data) {
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true,
                                inherit: false,
                                notify: true
                            });
                        }, function () {

                        });
                    }
                });
        };
    }])

    .controller('ModalReturnChangePasswdCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){
        $scope.confirm = function() {
            $modalInstance.close();
        }
    }])

    .controller('ModalChangePasswdErrorCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){
        $scope.confirm = function() {
            $modalInstance.close();
        }
    }]);