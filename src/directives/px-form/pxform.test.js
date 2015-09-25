import module from './index';
import _ from 'lodash';

describe('Directive: pxForm', () => {

  beforeEach(angular.mock.module(module));

  var basicTemplate = `
    <px-form
      data="data"
      catalog="catalog"
      fields="fields"
      options="options"
      form="form"
      pagination-change-handler="onPaginationChange(newPage, newPageSize)">
    </px-form>
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

    it('should initialize pagination', () => {
      compileAndSetupStuff();
      expect(vm.pagination_options).to.exist;
      expect(vm.pagination_options.paginationPageSizes).to.exist;
      expect(vm.pagination_options.paginationId).to.exist;
    });

  });

  describe('Catalog Initialization', () => {

    it('should initialize server-side pagination', () => {
      let catalog = {
        totalItems: 10,
        pageSize: 5,
        pageIndex: 1
      };
      compileAndSetupStuff({catalog});
      expect(vm.pagination_options.totalItems).to.equal(catalog.totalItems);
      expect(vm.pagination_options.paginationPageSize ).to.equal(catalog.pageSize);
      expect(vm.pagination_options.paginationCurrentPage).to.equal(catalog.pageIndex);
    });

    it('should initialize client-side pagination', () => {
      let data = ["a", "b"];
      compileAndSetupStuff({data, catalog: {}});
      expect(vm.pagination_options.totalItems).to.equal(data.length);
      expect(vm.pagination_options.paginationPageSize).to.equal(1);
      expect(vm.pagination_options.paginationCurrentPage).to.equal(1);
    });

  });

  describe('Fields Initialization', () => {

    it('should initialize fields', () => {
      let data = [
        {name: "Don", last: "Draper"},
        {name: "Pete", last: "Campbell"}
      ];
      let fields = [
        {key: "name", type: "input"},
        {key: "last", type: "input"}
      ];
      compileAndSetupStuff({data, fields, catalog: {}});
      expect(vm.fields).to.have.length(2);
      let ids = [];
      _.forEach(vm.fields, (fieldset) => {
         _.forEach(fieldset, (field) => {
          expect(field.id).to.exist;
          ids.push(field.id);
         });
      });
      expect(_.uniq(ids)).to.have.length(ids.length);
    });

    it('should not initialize when already initialized', () => {
      let data = [
        {name: "Don", last: "Draper"},
        {name: "Pete", last: "Campbell"}
      ];
      let fields = [
        {key: "name", type: "input"},
        {key: "last", type: "input"}
      ];
      compileAndSetupStuff({data, fields, catalog: {}});
      expect(vm.fields).to.have.length(2);
      fields = [[{name: {}, last: {}}, {name: {}, last: {}}]];
      compileAndSetupStuff({data, fields, catalog: {}});
      expect(vm.fields).to.have.length(2);
    });

    describe('should initialize nested fields', () => {

      it('in a fieldset'); //, () => {
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
      //   compileAndSetupStuff({data, fields, catalog: {}});
      //   expect(vm.fields).to.have.length(2);
      // });

      it('in a tabPanel');

      it('in a nested form');

      it('in a nested grid');

    });

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
