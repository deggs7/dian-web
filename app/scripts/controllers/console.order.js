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

    .controller('OrderCtrl', ['$scope', '$http', 'fetch', function($scope, $http, fetch){
        fetch('tables').success(function(data) {
            console.log('fetch tables');
            console.log(data);
        });
    }]);

