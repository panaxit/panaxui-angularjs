import angular from 'angular';

import './pxform.css';

import formly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';
import pxPagination from '../../directives/px-pagination';
import coreFilters from '../../core/filters';

export default angular.module('app.directives.pxform', [
    formly,
    formlyBootstrap,
    pxPagination,
    coreFilters
  ])
  .directive('pxForm', pxForm)
  .name;

function pxForm() {
  return {
    restrict: 'E',
    template: require('./pxform.html'),
    scope: {
      catalog: '=',
      data: '=',
      fields: '=',
      options: '=',
      form: '=?',
      paginationChangeHandler: '&?'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: pxFormCtrl
  };
}

function pxFormCtrl($scope) {
  var vm = this;

  /*
  initialization
   */

  initialize();

  $scope.$watch('vm.catalog', (newCatalog) => {
    if(newCatalog) initializeCatalog(newCatalog);
  });

  $scope.$watchCollection('vm.data', (newValues, oldValues) => {
    // Warning: Make sure to have vm.fields already loaded (loader())
    if(newValues && vm.fields)
      initializeFields(vm.fields, newValues);
  });

  /*
  function declarations
   */

  function initialize() {
    // Default options
    vm.pagination_options = {};
    vm.pagination_options.paginationPageSizes = [1, 2, 3, 5, 8, 13];
    vm.pagination_options.paginationId = 'pagination' + getRandomInt(0, 9999);
  }

  function initializeFields(fields, data) {
    // Not already initialized? (as array)
    if(!(vm.fields[0] && angular.isArray(vm.fields[0]))) {
      // Fields array initialization
      // Based on: http://angular-formly.com/#/example/advanced/repeating-section
      vm.fields = [];
      for(var index=0;index<data.length;index++) {
        vm.fields.push(copyFields(fields, index));
      }
    }
  }

  function initializeCatalog(catalog) {
    // Pagination
    if(catalog.totalItems) {
      // Server-side Pagination
      vm.pagination_options.totalItems = catalog.totalItems;
      vm.pagination_options.paginationPageSize = catalog.pageSize;
      vm.pagination_options.paginationCurrentPage = catalog.pageIndex;
    } else {
      // Client-side Pagination
      vm.pagination_options.totalItems = vm.data.length;
      vm.pagination_options.paginationPageSize = vm.catalog.pageSize || 1;
      vm.pagination_options.paginationCurrentPage = vm.catalog.pageIndex || 1;
    }
  }

  function copyFields(fields) {
    fields = angular.copy(fields);
    addRandomIds(fields);
    return fields;
  }

  function addRandomIds(fields) {
    angular.forEach(fields, function (field, index) {
      if (field.fields) {
        addRandomIds(field.fields);
        return; // fieldsets/tab don't need an ID
      }
      if (field.tabs) {
        addRandomIds(field.tabs);
        return; // tabs don't need an ID
      }
      if (field.fieldGroup) {
        addRandomIds(field.fieldGroup);
        return; // fieldGroups don't need an ID
      }
      if (field.data && field.data.fields) {
        addRandomIds(field.data.fields);
        return; // nested fields don't need an ID
      }

      field.id = field.id || (field.key + '_' + index + '_' + getRandomInt(0, 9999));
    });
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
