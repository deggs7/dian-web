'use strict';

describe('Service: defaultData', function () {

  // load the service's module
  beforeEach(module('dianApp'));

  // instantiate service
  var defaultData;
  beforeEach(inject(function (_defaultData_) {
    defaultData = _defaultData_;
  }));

  it('should do something', function () {
    expect(!!defaultData).toBe(true);
  });

});
