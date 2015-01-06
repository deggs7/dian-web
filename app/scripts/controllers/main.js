'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
  }])

  .controller('MainCtrl', ['$scope', function ($scope) {

  }])

  .controller('LoginCtrl', ['$scope', '$http', '$cookies', '$state', '$location',
      function ($scope, $http, $cookies, $state, $location) {

      $scope.login = function () {
        $http
          .post(config.api_url + '/api-token-auth/', $scope.user)
          .success(function (data, status, headers, config) {
            $cookies.token = data.token;
            $state.go('main');
          })
          .error(function (data, status, headers, config) {
            // Erase the token if the user fails to log in
            delete $cookies.token;
            // Handle login errors here
          });
      };

  }])
