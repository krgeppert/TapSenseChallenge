'use strict';

describe('Service: Computer', function () {

  // load the service's module
  beforeEach(module('tapSenseApp'));

  // instantiate service
  var Computer;
  beforeEach(inject(function (_Computer_) {
    Computer = _Computer_;
  }));

  it('should do something', function () {
    expect(!!Computer).toBe(true);
  });

});
