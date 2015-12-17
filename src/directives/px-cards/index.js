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
      options: '=',
      openHandler: '&',
      newHandler: '&',
      deleteHandler: '&',
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

  vm.onSelect = onSelect;

  /*
  Sync initialization
   */

  init();

  /*
  Async initialization
   */

  $scope.$watch('vm.options', function(newOptions) {
    if(newOptions) {
      initData(newOptions.data);
      initMetadata(newOptions.metadata);
    }
  });

  /*
  function declarations
   */

  function init() {
    // Default pagination options
    vm.pagination_options = {};
    vm.pagination_options.paginationPageSizes = [4, 8, 16, 32, 64, 128];
    vm.pagination_options.paginationId = 'pagination' + (Math.floor(Math.random() * (1000 - 1)) + 1);
    // Selected records
    vm.selectedRecords = [];
  }

  function initData(data) {
    if(data) {
      vm.pagination_options.totalItems = data.length;
    }
  }

  function initMetadata(metadata) {
    if(!metadata) return;
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
      //vm.pagination_options.totalItems = data.length;
      vm.pagination_options.paginationPageSize = metadata.pageSize || 8;
      vm.pagination_options.paginationCurrentPage = metadata.pageIndex || 1;
    }
  }

  function onSelect(record) {
    var index = vm.selectedRecords.indexOf(record);
    if(index > -1) {
      vm.selectedRecords.splice(index, 1);
    } else {
      vm.selectedRecords.push(record);
    }
  }
}
