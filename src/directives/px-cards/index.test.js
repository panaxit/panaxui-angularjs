import module from './index'
import _ from 'lodash'

describe('Directive: pxCards', () => {

  beforeEach(angular.mock.module(module))

  var basicTemplate = `
    <px-cards
      options="options"
      open-handler="onOpen(selected)"
      next-handler="onNext(selected)"
      pagination-change-handler="onPaginationChange(newPage, newPageSize)">
    </px-cards>
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

    it('should initialize pagination', () => {
      compileAndSetupStuff()
      expect(vm.paginationOptions).to.exist
      expect(vm.paginationOptions.paginationPageSizes).to.exist
      expect(vm.paginationOptions.paginationId).to.exist
    })

    it('should initialize selectedRecords', () => {
      compileAndSetupStuff()
      expect(vm.selectedRecords).to.exist
      expect(vm.selectedRecords).to.have.length(0)
    })

  })

  describe('Metadata Initialization', () => {

    it('should initialize server-side pagination', () => {
      let options = {
        metadata: {
          totalItems: 10,
          pageSize: 5,
          pageIndex: 1
        }
      }
      compileAndSetupStuff({
        options
      })
      expect(vm.paginationOptions.totalItems).to.equal(10)
      expect(vm.paginationOptions.paginationPageSize).to.equal(5)
      expect(vm.paginationOptions.paginationCurrentPage).to.equal(1)
    })

    it('should initialize client-side pagination', () => {
      let options = {
        metadata: {},
        data: ['a', 'b']
      }
      compileAndSetupStuff({
        options
      })
      expect(vm.paginationOptions.totalItems).to.equal(2)
      expect(vm.paginationOptions.paginationPageSize).to.equal(8)
      expect(vm.paginationOptions.paginationCurrentPage).to.equal(1)
    })

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
