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
            });

        $http({url: config.api_url + '/restaurant/default-restaurant/', method: 'GET'})
            .success(function (data, status, headers, config) {
                $scope.restaurant = data;
                $scope.restaurant_update = {
                    "name": $scope.restaurant.name
                };
            });


        $scope.update = function () {
            // 更新数据库部分
            $scope.restaurant_update['restaurant_id'] = $scope.$parent.restaurant.id;
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

            // 上传文件部分
            var file = $scope.background;
            var uploadUrl = config.qiniu_upload_url;
            var key = 'restaurant-' + $scope.$parent.restaurant.id;
            fileUpload.uploadFileToUrl(file, uploadUrl, $scope.uptoken, key, function () {
                console.log('upload completed');
                // 数据库中的file_key字段或许应该在此处回调
            }, function(){

            });
        };
    }]);
