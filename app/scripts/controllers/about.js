'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
