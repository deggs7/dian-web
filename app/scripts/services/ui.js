'use strict';

angular.module('dianApp')
    .controller('UiConfirmCtrl', ['$scope', '$modalInstance','options', function($scope, $modalInstance, options) {

        $scope.options = options;
        $scope.confirm = function(){
            $modalInstance.close();
        };

        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }])
    .service('ui', ['$modal', function($modal) {
        return {
            confirm: function(options) {
                return $modal.open({
                    controller: 'UiConfirmCtrl',
                    templateUrl: 'views/ui.confirm.html',
                    resolve: {
                        options: function() {
                            return options;
                        }
                    }
                }).result;

            }
        };
    }]);
