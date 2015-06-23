'use strict';

/**
 * @ngdoc service
 * @name dianApp.fileUpload
 * @description
 * # fileUpload
 * Service in the dianApp.
 */
angular.module('dianApp')
  .service('fileUpload', ['$http', '$q', function ($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function


    //created by back-end for uploading files used by front-end
    this.upload_info = function() {
        return $http.get(config.api_url + '/restaurant/uptoken-restaurant/')
            .then(function (res) {
                //no check for trust server
                return {
                    uptoken: res.data.uptoken,
                    file_key: res.data.file_key
                };
            });
    };

    this.upload_file = function(file) {
        var self = this;
        return this.upload_info().then(function(res) {
            self.uptoken = res.uptoken;
            self.file_key = res.file_key;
        }).then(function() {
            var ok_defer = $q.defer();
            self.uploadFileToUrl(file, config.qiniu_upload_url, self.uptoken, self.file_key, function() {
                ok_defer.resolve();
            }, function() {
                ok_defer.reject();
            });
            return ok_defer.promise;
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
    };

  }]);
