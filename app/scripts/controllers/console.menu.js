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
        $scope.menus = res.data;
        return $scope.menu = $scope.menus[0];
      }).then(function(menu) {
        console.log('menu selected:');
        console.log(arguments);
        return $http.get(config.api_url + '/menu/list-category-by-menu/' + menu.id + '/')
      }).then(function(res) {
        console.log('menu_catogaries:');
        console.log(res.data);
        $scope.menu_catogaries = res.data;
        
      });
      $scope.get_category_products = function(category_id) {
        $http.get(config.api_url + '/menu/list-product-by-category/' + category_id + '/').then(function(res) {
          console.log('category_products:');
          console.log(res.data);
          $scope.category_products = res.data;
        }, function(res) {
          
        })
      };
      $scope.menu_new = function(restaurant_id, menu_id) {
        console.log('menu_new:');
        //$http.post(api_url + '/menu/create-menu/', {})  
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
