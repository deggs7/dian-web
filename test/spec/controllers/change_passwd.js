'use strict';

describe('Controller: ChangePasswdCtrl', function () {

  // load the controller's module
  beforeEach(module('dianApp'));

  var ChangePasswdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChangePasswdCtrl = $controller('ChangePasswdCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
