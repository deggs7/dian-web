'use strict';

angular.module('dianApp')
    .factory('fetch', ['$http', '$resource', function($http, $resource) {
        return function(resource) {
            return {
                tables: $http({
                    url: config.api_url + '/table/list-table/',
                    method: 'GET'
                }),
                'table-type': $resource(config.api_url + '/table/table-type/:id/', {id: '@id'}, {
                    'update': {method: 'PUT'}
                })
            }[resource];
        };
    }]);

