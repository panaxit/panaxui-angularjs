/**
 * Dependencies
 */

import angular from 'angular';
import pxPagination from '../../directives/px-pagination';
//import coreFilters from '../../core/filters';

/**
 * Resources
 */

import style from './style.css';
import template from './template.html';

/**
 * Module
 */

export default angular.module('app.directives.pxtemplate', [
    pxPagination,
    //coreFilters
  ])
  .directive('pxTemplate', pxTemplate)
  .name;

/**
 * Directive
 */

function pxTemplate() {
  return {
    restrict: 'E',
    template: template,
    scope: {
      options: '=',
      paginationChangeHandler: '&?'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: pxTemplateCtrl
  };
}

/**
 * Directive's Controller
 */

function pxTemplateCtrl($scope, $window, $sce) {
  var vm = this;

  /*
  vm function assignments
   */

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
    vm.pagination_options.paginationPageSizes = [1];
    vm.pagination_options.paginationId = 'pagination' + (Math.floor(Math.random() * (1000 - 1)) + 1);
  }

  function initData(data) {
    // Set Content
    // https://docs.angularjs.org/api/ng/service/$sce#show-me-an-example-using-sce-
    // Security issue? Do it only for SVGs?
    vm.content = [$sce.trustAsHtml(data.template)];
    // Set Content-Type
    if(data.contentType) {
      vm.contentType = data.contentType.split(';')[0];
    }
  }

  function initMetadata(metadata) {
    // Pagination
    if(metadata.totalItems) {
      // Server-side Pagination
      vm.pagination_options.totalItems = metadata.totalItems;
      vm.pagination_options.paginationPageSize = metadata.pageSize;
      vm.pagination_options.paginationCurrentPage = metadata.pageIndex;
    } else {
      // Client-side Pagination
      vm.pagination_options.totalItems = 1;
      vm.pagination_options.paginationPageSize = 1;
      vm.pagination_options.paginationCurrentPage = 1;
    }
  }

  vm.printHandler = function() {
    var printArea = vm.content; //document.getElementById('px-printArea').innerHTML;
    var myWindow = $window.open('', '', 'width=1024, height=768');
    myWindow.document.write(printArea);
    myWindow.print();
  };
}
