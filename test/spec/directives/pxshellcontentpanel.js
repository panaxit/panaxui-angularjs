'use strict';

describe('Directive: pxShellContentPanel', function () {

  // load the directive's module
  beforeEach(module('panaxuiApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<px-shell-content-panel></px-shell-content-panel>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the pxShellContentPanel directive');
  }));
});
