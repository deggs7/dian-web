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
        /* 3rd Party Modules */
        'LocalStorageModule',
        'ui.router',
        'ui.utils',
        'mm.foundation'
    ])

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
        $urlRouterProvider.otherwise('/login');
    }])

    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('diankuai');
    }])

    .run(['$state', '$rootScope', function($state, $rootScope){
        $rootScope.$state = $state;
    }]);



