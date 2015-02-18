'use strict';

describe('Service: NavMenu', function () {

  // load the service's module
  beforeEach(module('panaxuiApp'));

  // instantiate service
  var NavMenu;
  beforeEach(inject(function (_NavMenu_) {
    NavMenu = _NavMenu_;
  }));

  it('should get NavMenu', function () {
    expect(!!NavMenu).toBe(true);
  });

});
