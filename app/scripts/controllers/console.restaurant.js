'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:RestaurantCtrl
 * @description
 * # RestaurantCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')
    .config(["$stateProvider", function($stateProvider){
        $stateProvider
            .state('console.restaurant', {
                url: "/restaurant",
                controller: "RestaurantCtrl",
                templateUrl: "views/console_restaurant.html"
            })

    }])

    .controller('RestaurantCtrl', ['$scope', '$http', 'fileUpload', function ($scope, $http, fileUpload) {
        $http({url: config.api_url + '/restaurant/uptoken-restaurant/', method: 'GET'})
            .success(function (data, status, headers, config) {
                $scope.uptoken = data.uptoken;
                $scope.file_key = data.file_key;
            });

        // 临时解决，用同一种获取file_key的方法，来获取微信logo的file_key
        $http({url: config.api_url + '/restaurant/uptoken-restaurant/', method: 'GET'})
            .success(function (data, status, headers, config) {
                $scope.wp_qrcode_uptoken = data.uptoken;
                $scope.wp_qrcode_file_key = data.file_key;
            });

        $http({url: config.api_url + '/restaurant/default-restaurant/', method: 'GET'})
            .success(function (data, status, headers, config) {
                $scope.restaurant = data;
                $scope.restaurant_update = {
                    "name": $scope.restaurant.name,
                    "wifi_name": $scope.restaurant.wifi_name,
                    "wifi_password": $scope.restaurant.wifi_password,
                    "wp_name": $scope.restaurant.wp_name
                };
            });

        $scope.upload_status = 0; // 0: wait 1:uploading 2:success -1:error
        $scope.update = function () {
            // 更新数据库部分
            $scope.restaurant_update['restaurant_id'] = $scope.$parent.restaurant.id;
            $scope.restaurant_update['file_key'] = $scope.file_key;
            $scope.restaurant_update['wp_qrcode_file_key'] = $scope.wp_qrcode_file_key;
            $http({
                method: 'PUT',
                url: config.api_url + '/restaurant/update-restaurant/',
                data: $.param($scope.restaurant_update),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                })
                .error(function (data, status, headers, config) {
                    // Handle errors here
                    console.log('error!!!!!!');
                    console.log(data);
                    console.log(status);
                });

            // 上传文件 - 餐厅背景图
            $scope.upload_status = 1;
            var file = $scope.background;
            var uploadUrl = config.qiniu_upload_url;
            var key = 'restaurant-' + $scope.$parent.restaurant.id;
            fileUpload.uploadFileToUrl(file, uploadUrl, $scope.uptoken, $scope.file_key, function () {
                // 数据库中的file_key字段或许应该在此处回调
                $scope.upload_status = 2;
            }, function(){
                $scope.upload_status = -1;
            });

            // 上传文件 - 微信二维码
            $scope.wp_qrcode_upload_status = 1;
            var file = $scope.wp_qrcode;
            var uploadUrl = config.qiniu_upload_url;
            var key = 'restaurant-' + $scope.$parent.restaurant.id;
            fileUpload.uploadFileToUrl(file, uploadUrl, $scope.wp_qrcode_uptoken, $scope.wp_qrcode_file_key, function () {
                // 数据库中的file_key字段或许应该在此处回调
                $scope.wp_qrcode_upload_status = 2;
            }, function(){
                $scope.wp_qrcode_upload_status = -1;
            });


        };
    }]);
