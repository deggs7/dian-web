'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:HistorayCtrl
 * @description
 * # HistorayCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')
    .config(["$stateProvider", function($stateProvider){
        $stateProvider
            .state('console.history', {
                url: "/history",
                controller: "HistoryCtrl",
                templateUrl: "views/console_history.html"
            })

    }])

    .controller('HistoryCtrl', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
        $http
            .get(config.api_url + '/restaurant/history/today-registration/')
            .success(function(data, status, headers, config){
                $scope.registrations = data;
            })
    }]);
