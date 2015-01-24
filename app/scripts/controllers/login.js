'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller: LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
    }])

    .controller('LoginCtrl', ['$scope', '$http', '$cookies', '$state',
        function ($scope, $http, $cookies, $state) {
        $scope.login = function () {
            $http
                .post(config.api_url + '/api-token-auth/', $scope.user)
                .success(function (data, status, headers, h_config) {
                    $cookies.token = data.token;

                    $http({url: config.api_url + '/restaurant/default-restaurant/', method: 'GET'})
                        .success(function (data, status, headers, config) {
                            $cookies.restaurant_id = data['id'];
                            $state.go('console.overview');
                        });
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $cookies.token;
                    // Handle login errors here
                });
        };

        $scope.go_retrieve_passwd = function() {
            $state.go('retrieve_passwd');
        }
    }]);