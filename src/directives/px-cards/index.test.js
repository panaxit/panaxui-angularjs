import module from './index';
import _ from 'lodash';

describe('Directive: pxCards', () => {

  beforeEach(angular.mock.module(module));

  var basicTemplate = `
    <px-cards
      data="data"
      metadata="metadata"
      fields="fields"
      options="options"
      open-handler="onOpen(selected)"
      next-handler="onNext(selected)"
      pagination-change-handler="onPaginationChange(newPage, newPageSize)">
    </px-cards>
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

    it('should initialize selectedRecords', () => {
      compileAndSetupStuff();
      expect(vm.selectedRecords).to.exist;
      expect(vm.selectedRecords).to.have.length(0);
    });

  });

  describe('Metadata Initialization', () => {

    it('should initialize server-side pagination', () => {
      let metadata = {
        totalItems: 10,
        pageSize: 5,
        pageIndex: 1
      };
      compileAndSetupStuff({metadata});
      expect(vm.pagination_options.totalItems).to.equal(metadata.totalItems);
      expect(vm.pagination_options.paginationPageSize ).to.equal(metadata.pageSize);
      expect(vm.pagination_options.paginationCurrentPage).to.equal(metadata.pageIndex);
    });

    it('should initialize client-side pagination', () => {
      let data = ["a", "b"];
      compileAndSetupStuff({data, metadata: {}});
      expect(vm.pagination_options.totalItems).to.equal(data.length);
      expect(vm.pagination_options.paginationPageSize ).to.equal(8);
      expect(vm.pagination_options.paginationCurrentPage).to.equal(1);
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
