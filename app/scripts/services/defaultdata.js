'use strict';

/**
 * @ngdoc service
 * @name dianApp.defaultData
 * @description
 * # defaultData
 * Service in the dianApp.
 */
angular.module('dianApp')
  .service('defaultData', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getRestaurant = function () {
      $http({url: config.api_url + '/restaurant/default-restaurant/', method: 'GET'})
        .success(function (data, status, headers, config) {
          return data;
        });
    }
  }]);
