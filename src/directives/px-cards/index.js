/**
 * Dependencies
 */

import angular from 'angular';
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

export default angular.module('app.directives.pxcards', [
    pxPagination,
    coreFilters
  ])
  .directive('pxCards', pxCards)
  .name;

/**
 * Directive
 */

function pxCards() {
  return {
    restrict: 'E',
    template: template,
    scope: {
      data: '=',
      metadata: '=',
      fields: '=',
      options: '=',
      openHandler: '&',
      newHandler: '&',
      nextHandler: '&',
      paginationChangeHandler: '&?'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: pxCardsCtrl
  };
}

/**
 * Directive's Controller
 */

function pxCardsCtrl($scope) {
  var vm = this;

  /*
  vm function assignments
   */

  vm.onClick = onClick;

  /*
  initialization
   */

  initialize();

  $scope.$watch('vm.metadata', function(newMetadata) {
    if(newMetadata) initializeMetadata(newMetadata);
  });

  /*
  function declarations
   */

  function initialize() {
    // Default pagination options
    vm.pagination_options = {};
    vm.pagination_options.paginationPageSizes = [4, 8, 16, 32, 64, 128];
    vm.pagination_options.paginationId = 'pagination' + (Math.floor(Math.random() * (1000 - 1)) + 1);
    // Selected records
    vm.selectedRecords = [];
  }

  function initializeMetadata(metadata) {
    // Default Upload Path (for Images)
    if(metadata.customAttrs && metadata.customAttrs.iconField) {
      vm.uploadPath = metadata.dbId + '/' + metadata.catalogName + '/' + metadata.customAttrs.iconField + '/';
    }
    // Pagination
    if(metadata.totalItems) {
      // Server-side Pagination
      vm.pagination_options.totalItems = metadata.totalItems;
      vm.pagination_options.paginationPageSize = metadata.pageSize;
      vm.pagination_options.paginationCurrentPage = metadata.pageIndex;
    } else {
      // Client-side Pagination
      vm.pagination_options.totalItems = vm.data.length;
      vm.pagination_options.paginationPageSize = vm.metadata.pageSize || 8;
      vm.pagination_options.paginationCurrentPage = vm.metadata.pageIndex || 1;
    }
  }

  function onClick(record) {
    if (['edit', 'readonly'].indexOf(vm.metadata.mode) > -1) {
      vm.openHandler({selected: record});
    } else if (vm.metadata.mode === 'browse') {
      var index = vm.selectedRecords.indexOf(record);
      if(index > -1) {
        vm.selectedRecords.splice(index, 1);
      } else {
        vm.selectedRecords.push(record);
      }
    }
  }
}
