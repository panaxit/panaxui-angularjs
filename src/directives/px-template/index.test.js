import module from './index';
import _ from 'lodash';

describe('Directive: pxTemplate', () => {

  beforeEach(angular.mock.module(module));

  var basicTemplate = `
    <px-template
      data="data"
      metadata="metadata">
    </px-template>
  `;

  var $compile, scope, el, node, isolateScope, vm;

  beforeEach(angular.mock.inject(function(_$compile_, $rootScope) {
    $compile = _$compile_;
    scope = $rootScope.$new();
  }));

  it('should compile', function() {
    compileAndSetupStuff();
    expect(el).to.exist;
    expect(node).to.exist;
    expect(isolateScope).to.exist;
    expect(vm).to.exist;
  });

  describe('Initialization', () => {

    it('PENDING');

  });

  describe('Metadata Initialization', () => {

    it('PENDING');

  });

  function compileAndSetupStuff(extraScopeProps, template) {
    _.merge(scope, extraScopeProps);
    el = $compile(template || basicTemplate)(scope);
    scope.$digest();
    node = el[0];
    isolateScope = el.isolateScope();
    vm = isolateScope.vm;
  }

});
