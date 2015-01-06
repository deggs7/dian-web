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
      .state('overview', {
        url: '/',
        templateUrl: 'views/overview.html',
        controller: 'OverviewCtrl'
      })
  }])


  .controller('OverviewCtrl', ['$scope', '$http', '$cookies', '$state', function ($scope, $http, $cookies, $state) {
  }])
