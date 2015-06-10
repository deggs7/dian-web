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
            });
    }])

    .controller('MenuCtrl', ['$scope', '$http', '$modal',  function($scope, $http, $modal) {
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


        $scope.del_product = function(product_id){
            var product_del_modalInstance = $modal.open({
                templateUrl: 'product_del.html',
                controller: 'ModalDelCtrl'
            });

            product_del_modalInstance.result.then(function (data) {
                return $http
                    .get(config.api_url + '/menu/delete-product/' + product_id + '/')
            }).then(function(res) {
              console.log('del_product ok');

            }, function(res) {
              console.error('del_product error');
            });
        };

    }])

    .controller('ModalDelCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){

        $scope.confirm = function(){
            $modalInstance.close();
        };

        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }]);
