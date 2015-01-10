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
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
  }])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        controller: 'MainCtrl'
      })
  }])

  .controller('MainCtrl', ['$scope', '$http', '$location', '$cookies', function ($scope, $http, $location, $cookies) {

    $scope.isSpecificPage = function(){
        var path = $location.path();
        return _.contains(['/login', '/registration'], path);
    };

    $scope.account = null;
    $scope.restaurant = null;

    $http({url: config.api_url + '/account/my-account/', method: 'GET'})
      .success(function (data, status, headers, config) {
        $scope.account = data;
      });

    $http({url: config.api_url + '/restaurant/default-restaurant/', method: 'GET'})
      .success(function (data, status, headers, config) {
        $scope.restaurant = data;
        $cookies.restaurant_id = data['id'];
      });

  }])


  .controller('LoginCtrl', ['$scope', '$http', '$cookies', '$state', function ($scope, $http, $cookies, $state) {
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
  }]);
