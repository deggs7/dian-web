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
            .state('restaurant', {
                url: "/restaurant",
                controller: "RestaurantCtrl",
                templateUrl: "views/restaurant.html"
            })

    }])

    .controller('RestaurantCtrl', ['$scope', '$http', function ($scope, $http) {
        $http({url: config.api_url + '/restaurant/uptoken-restaurant/', method: 'GET'})
            .success(function (data, status, headers, config) {
                $scope.uptoken = data.uptoken;
            });

        $http({url: config.api_url + '/restaurant/qiniu-domain/', method: 'GET'})
            .success(function (data, status, headers, config) {
                $scope.qiniu_domain = data.domain;
            });

        $scope.save = function () {

        };
    }]);
