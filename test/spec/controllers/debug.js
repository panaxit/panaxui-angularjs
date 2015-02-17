'use strict';

describe('Controller: DebugctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('panaxuiApp'));

  var DebugctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DebugctrlCtrl = $controller('DebugctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
