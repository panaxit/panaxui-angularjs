import module from './index'
import _ from 'lodash'

describe('Directive: pxGrid', () => {

  beforeEach(angular.mock.module(module))

  var basicTemplate = `
    <px-grid
      options="options"
      open-handler="onOpen(selected)"
      new-handler="onNew(catalogName)"
      delete-handler="onDelete(selected)"
      pagination-change-handler="onPaginationChange(newPage, pageSize)"
      row-change-promise="onRowChange(rowEntity)"
      next-handler="onNext(selected)">
    </px-grid>
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

    it('should initialize uigrid options', () => {
      compileAndSetupStuff()
      expect(vm.uiGrid).to.exist
      expect(vm.uiGrid.paginationPageSizes).to.exist
      expect(vm.uiGrid.onRegisterApi).to.exist
    })

  })

  describe('Data Initialization', () => {

    it('should initialize data', () => {
      let options = {
        data: [{
          name: 'Don',
          last: 'Draper'
        }, {
          name: 'Pete',
          last: 'Campbell'
        }]
      }
      compileAndSetupStuff({
        options
      })
      expect(vm.uiGrid.data).to.exist
      expect(vm.uiGrid.data).to.have.length(2)
    })

  })

  describe('Fields Initialization', () => {

    it('should initialize fields', () => {
      let options = {
        data: [{
          name: 'Don',
          last: 'Draper'
        }, {
          name: 'Pete',
          last: 'Campbell'
        }],
        fields: [{
          field: 'name',
          type: 'string',
          displayName: 'Name'
        }, {
          field: 'last',
          type: 'string',
          displayName: 'Last'
        }]
      }
      compileAndSetupStuff({
        options
      })
      expect(vm.uiGrid.columnDefs).to.exist
      expect(vm.uiGrid.columnDefs).to.have.length(2)
    })

  })

  describe('Options Initialization', () => {

    it('should initialize fields', () => {
      let options = {
        data: [{
          name: 'Don',
          last: 'Draper'
        }, {
          name: 'Pete',
          last: 'Campbell'
        }],
        fields: [{
          field: 'name',
          type: 'string',
          displayName: 'Name'
        }, {
          field: 'last',
          type: 'string',
          displayName: 'Last'
        }],
        opts: {
          enableRowSelection: true,
          enableRowHeaderSelection: false,
          enableFullRowSelection: true,
          multiSelect: false,
          showRowActionsColumn: true
        }
      }
      compileAndSetupStuff({
        options
      })
      expect(vm.uiGrid.enableRowSelection).to.equal(true)
      expect(vm.uiGrid.enableRowHeaderSelection).to.equal(false)
      expect(vm.uiGrid.enableFullRowSelection).to.equal(true)
      expect(vm.uiGrid.multiSelect).to.equal(false)
      expect(vm.uiGrid.enableSelectAll).to.equal(true)
      expect(vm.uiGrid.columnDefs).to.have.length(3)
    })

  })

  describe('Metadata Initialization', () => {

    it('should initialize external pagination', () => {
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
      expect(vm.uiGrid.useExternalPagination).to.equal(true)
      expect(vm.uiGrid.totalItems).to.equal(10)
      expect(vm.uiGrid.paginationPageSize).to.equal(5)
      expect(vm.uiGrid.paginationCurrentPage).to.equal(1)
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
