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


    //created by back-end for uploading files used by front-end
    this.upload_info = function() {
        return $http({url: config.api_url + '/restaurant/uptoken-restaurant/', method: 'GET'})
            .success(function (data) {
                return {
                    uptoken: data.uptoken,
                    file_key: data.file_key
                };
            });
    };

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
