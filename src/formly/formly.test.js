import module from './index';

describe('Formly', () => {

  beforeEach(angular.mock.module(module));

  describe('[Type]: async_select', () => {

    var scope, $controller, ctrl, controllerLocals;

    beforeEach(angular.mock.inject(function(_$controller_, $rootScope, formlyConfig) {
      $controller = _$controller_;
      ctrl = formlyConfig.getType('async_select').controller;
      scope = $rootScope.$new();
      scope.options = {}; // <-- field configuration
      controllerLocals = {$scope: scope};
    }));

    it('PENDING');//, function() {
    //   var instance = $controller(ctrl, controllerLocals);
    // });

  });

  describe('[Type]: datetime', () => {

    var scope, $controller, ctrl, controllerLocals;

    beforeEach(angular.mock.inject(function(_$controller_, $rootScope, formlyConfig) {
      $controller = _$controller_;
      ctrl = formlyConfig.getType('datetime').controller;
      scope = $rootScope.$new();
      scope.options = {}; // <-- field configuration
      controllerLocals = {$scope: scope};
      scope.model = {};
    }));

    it('PENDING');//, function() {
    //   var instance = $controller(ctrl, controllerLocals);
    // });

  });

});
