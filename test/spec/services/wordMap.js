'use strict';

describe('Service: Wordmap', function () {

  // load the service's module
  beforeEach(module('tapSenseApp'));

  // instantiate service
  var Wordmap;
  beforeEach(inject(function (_Wordmap_) {
    Wordmap = _Wordmap_;
  }));

  it('should do something', function () {
    expect(!!Wordmap).toBe(true);
  });

});
