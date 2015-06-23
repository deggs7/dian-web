'use strict';

describe('OrderCtrl', function() {
  beforeEach(module('dianApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('tables', function() {
    it('tables', function() {
      var $scope = {};
      var controller = $controller('OrderCtrl', { $scope: $scope });
      //expect(1).toEqual(1);
    });
  });
});
