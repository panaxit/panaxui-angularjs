import module from './index'
import _ from 'lodash'

describe('Directive: pxForm', () => {

  beforeEach(angular.mock.module(module))

  var basicTemplate = `
    <px-form
      options="options"
      form="form"
      pagination-change-handler="onPaginationChange(newPage, newPageSize)">
    </px-form>
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
      expect(vm.paginationOptions.paginationPageSize).to.equal(1)
      expect(vm.paginationOptions.paginationCurrentPage).to.equal(1)
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
          key: 'name',
          type: 'input'
        }, {
          key: 'last',
          type: 'input'
        }]
      }
      compileAndSetupStuff({
        options
      })
      expect(vm.options.fields).to.have.length(2)
      let ids = []
      _.forEach(vm.options.fields, (fieldset) => {
        _.forEach(fieldset, (field) => {
          expect(field.id).to.exist
          ids.push(field.id)
        })
      })
      expect(_.uniq(ids)).to.have.length(ids.length)
    })

    it('should not initialize when already initialized', () => {
      let options = {
        metadata: {},
        data: [{
          name: 'Don',
          last: 'Draper'
        }, {
          name: 'Pete',
          last: 'Campbell'
        }],
        fields: [{
          key: 'name',
          type: 'input'
        }, {
          key: 'last',
          type: 'input'
        }]
      }
      compileAndSetupStuff({
        options
      })
      expect(vm.options.fields).to.have.length(2)
      options.fields = []
      compileAndSetupStuff({
        options
      })
      expect(vm.options.fields).to.have.length(2)
    })

    describe('should initialize nested fields', () => {

      it('in a fieldset') //, () => {
        //   let data = [
        //     {name: "Don", last: "Draper"},
        //     {name: "Pete", last: "Campbell"}
        //   ];
        //   let fields = [{
        //     type: "fieldset",
        //     fields: [
        //       {key: "name", type: "input", templateOptions: {label: "Name"}},
        //       {key: "last", type: "input", templateOptions: {label: "Last"}}
        //     ]
        //   }];
        //   compileAndSetupStuff({data, fields, metadata: {}});
        //   expect(vm.options.fields).to.have.length(2);
        // });

      it('in a tabPanel')

      it('in a nested form')

      it('in a nested grid')

    })

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
