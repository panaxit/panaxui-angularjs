'use strict';

describe('Service: navMenu', function () {

  // load the service's module
  beforeEach(module('panaxuiApp'));

  // instantiate service
  var navMenu;
  beforeEach(inject(function (_navMenu_) {
    navMenu = _navMenu_;
  }));

  it('should do something', function () {
    expect(!!navMenu).toBe(true);
  });

});
