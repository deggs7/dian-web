'use strict';

describe('Controller: RetrievePasswdCtrl', function () {

  // load the controller's module
  beforeEach(module('dianApp'));

  var RetrievePasswdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RetrievePasswdCtrl = $controller('RetrievePasswdCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
