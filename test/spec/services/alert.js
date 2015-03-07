'use strict';

describe('Service: AlertService', function () {

  // load the service's module
  beforeEach(module('panaxuiApp'));

  // instantiate service
  var AlertService;
  beforeEach(inject(function (_AlertService_) {
    AlertService = _AlertService_;
  }));

  it('should do something', function () {
    expect(!!AlertService).toBe(true);
  });

});
