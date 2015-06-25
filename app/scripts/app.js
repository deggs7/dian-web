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
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngResource',
        /* 3rd Party Modules */
        'LocalStorageModule',
        'ui.router',
        'ui.utils',
        'mm.foundation'
    ])

    .factory('DataLoadingInterceptor', function ($q, $window) {
      return {
        'response': function(response) {
          $(".page-loading").hide();
          return response;
        },
        'responseError': function(rejection) {
          $(".page-loading").hide();
          return $q.reject(rejection);
        }
      }
    })

    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('DataLoadingInterceptor');
      var spinnerFunction = function spinnerFunction(data, headersGetter) {
        $(".page-loading").show();
        return data;
      };
      $httpProvider.defaults.transformRequest.push(spinnerFunction);
    })

    .config(['$resourceProvider', function($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }])

    .factory('authInterceptor', ['$q', '$cookies', '$location', 'localStorageService', function ($q, $cookies, $location, localStorageService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if(localStorageService.isSupported) {
                  if (localStorageService.get('token')) {
                      config.headers.Authorization = 'Token ' + localStorageService.get('token');
                  }
                  if (localStorageService.get('restaurant_id')) {
                      config.headers['X-Restaurant-Id'] = localStorageService.get('restaurant_id');
                  }
                }else {
                  // 对不支持html5的浏览器
                  if ($cookies.token) {
                      config.headers.Authorization = 'Token ' + $cookies.token;
                  }
                  if ($cookies.restaurant_id) {
                      config.headers['X-Restaurant-Id'] = $cookies.restaurant_id;
                  }
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
        $urlRouterProvider.otherwise('/console/overview');
    }])

    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('diankuai');
    }])

    .run(['$state', '$rootScope', function($state, $rootScope){
        $rootScope.$state = $state;
    }]);



