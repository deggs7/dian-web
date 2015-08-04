'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller:QrcodeCtrl
 * @description
 * # QrcodeCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')
.config(["$stateProvider", function($stateProvider){
  $stateProvider
  .state('console.qrcode', {
    url: "/qrcode",
    controller: "QrcodeCtrl",
    templateUrl: "views/console_qrcode.html"
  })

}])

.controller('QrcodeCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {
  $scope.cdn_file_url = config.cdn_file_url;
  $http({
    url: config.api_url + '/restaurant/all-qrcode/',
    method: 'GET'
  })
  .success(function(data, status, headers, config){
    $scope.queue = data.queue;
    $scope.menu = data.menu;
  });
}]);


