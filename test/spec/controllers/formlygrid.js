'use strict';

describe('Controller: FormlyGridCtrl', function () {

  // load the controller's module
  beforeEach(module('panaxuiApp'));

  var FormlyGridCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormlyGridCtrl = $controller('FormlyGridCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });
});
