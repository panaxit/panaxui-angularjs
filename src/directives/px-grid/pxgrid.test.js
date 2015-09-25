import module from './index';
import _ from 'lodash';

describe('Directive: pxGrid', () => {

  beforeEach(angular.mock.module(module));

  var basicTemplate = `
    <px-grid
      data="data"
      catalog="catalog"
      fields="fields"
      options="options"
      open-handler="onOpen(selected)"
      new-handler="onNew(catalogName)"
      delete-handler="onDelete(selected)"
      pagination-change-handler="onPaginationChange(newPage, pageSize)"
      row-change-promise="onRowChange(rowEntity)"
      next-handler="onNext(selected)">
    </px-grid>
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

    it('should initialize uigrid options', () => {
      compileAndSetupStuff();
      expect(vm.uigrid_options).to.exist;
      expect(vm.uigrid_options.paginationPageSizes).to.exist;
      expect(vm.uigrid_options.onRegisterApi).to.exist;
    });

  });

  describe('Data Initialization', () => {

    it('should initialize data', () => {
      let data = [
        {name: "Don", last: "Draper"},
        {name: "Pete", last: "Campbell"}
      ];
      compileAndSetupStuff({data});
      expect(vm.uigrid_options.data).to.exist;
      expect(vm.uigrid_options.data).to.have.length(2);
    });

  });

  describe('Fields Initialization', () => {

    it('should initialize fields', () => {
      let data = [
        {name: "Don", last: "Draper"},
        {name: "Pete", last: "Campbell"}
      ];
      let fields = { columnDefs: [
        {field: "name", type: "string", displayName: "Name"},
        {field: "last", type: "string", displayName: "Last"}
      ]};
      compileAndSetupStuff({data, fields, catalog: {}});
      expect(vm.uigrid_options.columnDefs).to.exist;
      expect(vm.uigrid_options.columnDefs).to.have.length(2);
    });

  });

  describe('Options Initialization', () => {

    it('should initialize fields', () => {
      let data = [
        {name: "Don", last: "Draper"},
        {name: "Pete", last: "Campbell"}
      ];
      let fields = { columnDefs: [
        {field: "name", type: "string", displayName: "Name"},
        {field: "last", type: "string", displayName: "Last"}
      ]};
      let options = {
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        enableFullRowSelection: true,
        multiSelect: false,
        showRowActionsColumn: true
      };
      compileAndSetupStuff({data, fields, catalog: {}, options});
      expect(vm.uigrid_options.enableRowSelection).to.exist;
      expect(vm.uigrid_options.enableRowHeaderSelection).to.exist;
      expect(vm.uigrid_options.enableFullRowSelection).to.exist;
      expect(vm.uigrid_options.multiSelect).to.exist;
      expect(vm.uigrid_options.enableSelectAll).to.exist;
      expect(vm.uigrid_options.columnDefs).to.have.length(3);
    });

  });

  describe('Catalog Initialization', () => {

    it('should initialize external pagination', () => {
      let catalog = {
        totalItems: 10,
        pageSize: 5,
        pageIndex: 1
      };
      compileAndSetupStuff({catalog});
      expect(vm.uigrid_options.useExternalPagination).to.equal(true);
      expect(vm.uigrid_options.totalItems).to.equal(catalog.totalItems);
      expect(vm.uigrid_options.paginationPageSize ).to.equal(catalog.pageSize);
      expect(vm.uigrid_options.paginationCurrentPage).to.equal(catalog.pageIndex);
    });

  });

  describe('Handlers', () => {

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
