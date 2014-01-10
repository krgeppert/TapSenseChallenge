'use strict';

describe('Service: Prefixtree', function () {

  // load the service's module
  beforeEach(module('tapSenseApp'));

  // instantiate service
  var Prefixtree;
  beforeEach(inject(function (_Prefixtree_) {
    Prefixtree = _Prefixtree_;
  }));

  it('should do something', function () {
    expect(!!Prefixtree).toBe(true);
  });

});
