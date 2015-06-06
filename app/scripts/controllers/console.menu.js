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

    .controller('MenuCtrl', ['$scope', function($scope) {
      $scope.copy_of_table_types = $scope.menu_types = [{
        name: 'a dinner',
        list: [
          {
            img: 'http://rp.dk26.com:3080/20150523/images/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86/u94.png',
            name: '123',
            price: 123,
            unit: '盘'
          }
        ]
      }];
      
    }]);
