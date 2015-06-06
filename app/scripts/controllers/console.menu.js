'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('console.menu', {
                url: '/menu',
                templateUrl: 'views/console_menu.html',
                controller: 'MenuCtrl'
            })
    }])

    .controller('MenuCtrl', ['$scope', function() {
      
    }]);
