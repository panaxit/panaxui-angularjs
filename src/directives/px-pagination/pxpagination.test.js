import module from './index';
import _ from 'lodash';

describe('Directive: pxPagination', () => {

  beforeEach(angular.mock.module(module));

  var basicTemplate = `
    <div class="px-card"
         dir-paginate="record in data | filter:query | itemsPerPage: pagination_options.paginationPageSize"
         total-items="pagination_options.totalItems"
         current-page="pagination_options.paginationCurrentPage"
         pagination-id="pagination_options.paginationId">

    </div>

    <px-pagination
      options="pagination_options"
      ng-attr-on-pagination-change="paginationChangeHandler({newPage: newPage, newPageSize: newPageSize})">
    </px-pagination>
  `;

  var $compile, scope, el, node, isolateScope, vm;

  beforeEach(angular.mock.inject(function(_$compile_, $rootScope) {
    $compile = _$compile_;
    scope = $rootScope.$new();
  }));

  it('should compile');//, function() {
  //   compileAndSetupStuff();
  //   expect(el).to.exist;
  //   expect(node).to.exist;
  //   expect(isolateScope).to.exist;
  //   expect(vm).to.exist;
  // });

  describe('Options Initialization', () => {

    it('PENDING');

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
