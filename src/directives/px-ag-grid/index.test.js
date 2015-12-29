import module from './index'
import _ from 'lodash'

describe('Directive: pxAgGrid', () => {

  beforeEach(angular.mock.module(module))

  var basicTemplate = `
    <px-ag-grid
      options="options">
    </px-ag-grid>
  `

  var $compile, scope, el, node, isolateScope, vm

  beforeEach(angular.mock.inject(function(_$compile_, $rootScope) {
    $compile = _$compile_
    scope = $rootScope.$new()
  }))

  it('should compile', function() {
    compileAndSetupStuff()
    expect(el).to.exist
    expect(node).to.exist
    expect(isolateScope).to.exist
    expect(vm).to.exist
  })

  describe('Initialization', () => {

    it('PENDING')

  })

  describe('Data Initialization', () => {

    it('PENDING')

  })

  describe('Fields Initialization', () => {

    it('PENDING')

  })

  describe('Options Initialization', () => {

    it('PENDING')

  })

  describe('Metadata Initialization', () => {

    it('PENDING')

  })

  describe('Handlers', () => {

    it('PENDING')

  })

  function compileAndSetupStuff(extraScopeProps, template) {
    _.merge(scope, extraScopeProps)
    el = $compile(template || basicTemplate)(scope)
    scope.$digest()
    node = el[0]
    isolateScope = el.isolateScope()
    vm = isolateScope.vm
  }

})
