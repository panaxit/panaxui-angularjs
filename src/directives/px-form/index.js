/**
 * Dependencies
 */

import angular from 'angular';
import formly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';
import pxPagination from '../../directives/px-pagination';
import coreFilters from '../../core/filters';

/**
 * Resources
 */

import style from './style.css';
import template from './template.html';

/**
 * Module
 */

export default angular.module('app.directives.pxform', [
    formly,
    formlyBootstrap,
    pxPagination,
    coreFilters
  ])
  .directive('pxForm', pxForm)
  .name;

/**
 * Directive
 */

function pxForm() {
  return {
    restrict: 'E',
    template: template,
    scope: {
      metadata: '=',
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

/**
 * Directive's Controller
 */

function pxFormCtrl($scope) {
  var vm = this;

  /*
  initialization
   */

  initialize();

  $scope.$watch('vm.metadata', (newMetadata) => {
    if(newMetadata) initializeMetadata(newMetadata);
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

  function initializeMetadata(metadata) {
    // Pagination
    if(metadata.totalItems) {
      // Server-side Pagination
      vm.pagination_options.totalItems = metadata.totalItems;
      vm.pagination_options.paginationPageSize = metadata.pageSize;
      vm.pagination_options.paginationCurrentPage = metadata.pageIndex;
    } else {
      // Client-side Pagination
      vm.pagination_options.totalItems = vm.data.length;
      vm.pagination_options.paginationPageSize = vm.metadata.pageSize || 1;
      vm.pagination_options.paginationCurrentPage = vm.metadata.pageIndex || 1;
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
