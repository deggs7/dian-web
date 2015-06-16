'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller: OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the dianApp
 */

angular.module('dianApp')

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('console.order', {
                controller: 'OrderCtrl',
                url: '/order',
                templateUrl: 'views/console_order.html'
            });
    }])

    .controller('OrderCtrl', ['$scope', '$http', function($scope, $http){
    }]);

