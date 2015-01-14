'use strict';

/**
 * @ngdoc service
 * @name dianApp.fileUpload
 * @description
 * # fileUpload
 * Service in the dianApp.
 */
angular.module('dianApp')
  .service('fileUpload', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.uploadFileToUrl = function(file, uploadUrl, uptoken, key, success_callback, error_callback){
      var fd = new FormData();
      fd.append('file', file);
      fd.append('token', uptoken);
      fd.append('key', key);
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function (data, status, headers, config) {
        success_callback(data, status, headers, config);
      })
      .error(function (data, status, headers, config) {
        error_callback(data, status, headers, config);
      });
    }

  }]);
