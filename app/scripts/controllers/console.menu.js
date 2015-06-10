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

    .controller('MenuCtrl', ['$scope', '$http', function($scope, $http) {
      $http.get(config.api_url + '/menu/list-menu/').then(function(res) {
        console.log('list-menu:');
        console.log(res.data);  
        $scope.copy_of_table_types = $scope.menu_types = res.data;
      }, function(res) {
      });
      $scope.menu_products = function(restaurant_id, menu_id) {
        console.log('menu_products:');
        console.log(arguments);  


      };
      /*
      $scope.copy_of_table_types = $scope.menu_types = [{
        name: 'a dinner',
        id: '1'
        list: [
          {
            img: 'http://rp.dk26.com:3080/20150523/images/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86/u94.png',
            name: '123',
            price: 123,
            unit: '盘'
          }
        ]
      }];
      */
      
    }]);
