'use strict';

describe('Controller: RegistratioinCtrl', function () {

  // load the controller's module
  beforeEach(module('dianApp'));

  var RegistratioinCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistratioinCtrl = $controller('RegistratioinCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
