'use strict';

describe('Service: DebugService', function () {

  // load the service's module
  beforeEach(module('panaxuiApp'));

  // instantiate service
  var DebugService;
  beforeEach(inject(function (_DebugService_) {
    DebugService = _DebugService_;
  }));

  it('should do something', function () {
    expect(!!DebugService).toBe(true);
  });

});
