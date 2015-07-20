'use strict';

describe('Controller: ConsoleExchangeCtrl', function () {

  // load the controller's module
  beforeEach(module('dianApp'));

  var ConsoleExchangeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsoleExchangeCtrl = $controller('ConsoleExchangeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
