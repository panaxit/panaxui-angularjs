'use strict';

describe('Directive: pxShellNavTree', function () {

  // load the directive's module
  beforeEach(module('panaxuiApp'));

  var /*element,*/
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<px-shell-nav-tree></px-shell-nav-tree>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the pxShellNavTree directive');
  // }));
});
