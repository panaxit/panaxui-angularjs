import module from './index';

describe('Directive: pxForm', () => {
  var $compile,
      $rootScope;

  beforeEach(angular.mock.module(module));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('PENDING');

});
