'use strict';

/* global _, config */
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

    .controller('MenuCtrl', ['$scope', '$http', '$modal', 'fileUpload', function($scope, $http, $modal, file_upload) {
        $http.get(config.api_url + '/menu/list-menu/').then(function(res) {
            console.log('list-menu:');
            console.log(res.data);
            $scope.menus = res.data;
            $scope.menu = $scope.menus[0];
            return $scope.menu;
        }).then(function(menu) {
            console.log('menu selected:');
            console.log(arguments);
            return $http.get(config.api_url + '/menu/list-category-by-menu/' + menu.id + '/');
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
            }, function() {

            });
        };

        $scope.create_category = function(menu) {
            var category_create_modal_instance = $modal.open({
                templateUrl: 'catogary_create.html',
                controller: 'ModalCatogaryCreateCtrl'//use same modal template for edit product
            });

            category_create_modal_instance.result.then(function (category) {
                console.log('create category');

                category.menu = menu.id;
                $http.post(config.api_url + '/menu/create-category/', category).then(function(res) {
                    $scope.menu_catogaries.push(res.data);//res.data is a catogary instance
                }, function() {

                });

            });


        };

        $scope.create_product = function(category_id) {
            var product_create_modal_instance = $modal.open({
                templateUrl: 'product_create.html',
                controller: 'ModalProductCreateCtrl'//use same modal template for edit product
            });
            product_create_modal_instance.result.then(function (product) {
                console.log('create product');

                file_upload.upload_file(product.img_file).then(function() {
                    product.category = category_id;
                    product.img_key = file_upload.file_key;
                    $http.post(config.api_url + '/menu/create-product/', product).then(function(res) {
                        $scope.category_products.push(res.data);//res.data is a product instance
                    }, function() {

                    });
                })


            });
        };


        $scope.del_product = function(product){
            var product_del_modal_instance = $modal.open({
                templateUrl: 'product_del.html',
                controller: 'ModalDelCtrl'
            });

            product_del_modal_instance.result.then(function () {
                return $http
                    .get(config.api_url + '/menu/delete-product/' + product.id + '/');
            }).then(function() {
              console.log('del_product ok');
              $scope.category_products = _.without($scope.category_products, product);

            }, function() {
              console.error('del_product error');
            });
        };

        $scope.edit_product = function(product) {
            console.log('edit product');
            console.log(product);
            var old_img_key = product.img_key;

            //提前获取上传文件的token
            file_upload.upload_info().then(function(info) {
                $scope.uptoken = info.uptoken;
                $scope.file_key = info.file_key;
            });

            var product_edit_modal_instance = $modal.open({
                templateUrl: 'product_edit.html',
                controller: 'ModalProductEditCtrl',
                resolve: {
                    //only accept function or array
                    product: function() {
                        return product;
                    }
                }
            });
            product_edit_modal_instance.result.then(function (product) {
                var file;

                $scope.upload_status = 1;
                file = product.img_file;
                if (file) { //whether user modifies the img of product?
                    file_upload.upload_file(file).then(function() {
                        $scope.upload_status = 2;
                        product.img_key = file_upload.file_key;
                        post_product();
                    }, function() {
                        $scope.upload_status = -1;
                    });
                } else {
                    $scope.file_key = old_img_key;
                    post_product();
                }

                function post_product() {
                    $http.post(config.api_url + '/menu/update-product/' + product.id + '/', product).then(function(res) {
                        console.log('update product');
                        console.log(res);
                    }, function(res) {

                    });
                }




            }, function() {
            });
            /*
            $http.post(config.api_url + '/menu/update-product/' + product_id + '/').then(function(res) {

            });
            */

        };

    }])

    .controller('ModalDelCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){

        $scope.confirm = function(){
            $modalInstance.close();
        };

        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }])

    .controller('ModalProductEditCtrl', ['$scope', '$modalInstance', 'product', function($scope, $modalInstance, product){

        $scope.product = product;
        $scope.confirm = function(){
            $modalInstance.close($scope.product);
        };

        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }])

    .controller('ModalCatogaryCreateCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){

        $scope.category = {};

        $scope.confirm = function(){
            $modalInstance.close($scope.category);
        };

        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }])

    .controller('ModalProductCreateCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){

        $scope.product = {};

        $scope.confirm = function(){
            $modalInstance.close($scope.product);
        };

        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }]);
