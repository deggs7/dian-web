'use strict';

/**
 * @ngdoc directive
 * @name dianApp.directive:fileUpload
 * @description
 * # fileUpload
 */
angular.module('dianApp')
  .directive('fileUpload', ['$parse', function ($parse) {

    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileUpload);
        var modelSetter = model.assign;

        element.bind('change', function(){
          scope.$apply(function(){
            var file;
            modelSetter(scope, file = element[0].files[0]);
            scope.$emit('upload_file_change', file);
          });
        });
      }
    };

  }]);
