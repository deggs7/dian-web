'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller: ConsoleCtrl
 * @description
 * # ConsoleCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('console', {
                abstract: true,
                controller: 'ConsoleCtrl',
                url: '/console',
                templateUrl: 'views/console.html'
            })
    }])


    .controller('ConsoleCtrl', ['$scope', '$state', '$http', '$location', '$cookies',
        function ($scope, $state, $http, $location, $cookies) {

            $scope.account = null;
            $scope.restaurant = null;

            $http({url: config.api_url + '/account/my-account/', method: 'GET'})
                .success(function (data, status, headers, config) {
                    $scope.account = data;
                });

            $http({url: config.api_url + '/restaurant/default-restaurant/', method: 'GET'})
                .success(function (data, status, headers, config) {
                    $scope.restaurant = data;
                });

            $scope.logout = function(){
                delete $cookies.restaurant_id;
                delete $cookies.token;

                $state.go('login');
            };

        }]);
