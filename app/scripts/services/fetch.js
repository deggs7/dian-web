'use strict';

angular.module('dianApp')
    .factory('fetch', ['$http', function($http) {
        return function(resource) {
            return {
                tables: $http({
                    url: config.api_url + '/table/list-table/',
                    method: 'GET'
                })
            }[resource];
        };
    }]);

