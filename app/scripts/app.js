'use strict';

/**
 * @ngdoc overview
 * @name dianApp
 * @description
 * # dianApp
 *
 * Main module of the application.
 */
angular
  .module('dianApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    /* 3rd Party Modules */
    'ui.router',
    'ui.utils',
    'mm.foundation'
  ])

  .factory('authInterceptor', ['$q', '$cookies', '$location', function ($q, $cookies, $location) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookies.token) {
          config.headers.Authorization = 'Token ' + $cookies.token;
        }
        if ($cookies.restaurant_id) {
          config.headers['X-Restaurant-Id'] = $cookies.restaurant_id;
        }
        return config;
      },
      responseError: function (response) {
        if (response.status == 401) {
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  }])

  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    //$httpProvider.defaults.withCredentials = true;
  }])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    // $urlRouterProvider.when('/', '/login');
  }]);



