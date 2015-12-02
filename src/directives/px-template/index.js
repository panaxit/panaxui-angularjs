/**
 * Dependencies
 */

import angular from 'angular';
//import pxPagination from '../../directives/px-pagination';
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
    //pxPagination,
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
      data: '=',
      catalog: '=',
      options: '='
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
  initialization
   */

  initialize();

  $scope.$watch('vm.data', function(newData) {
    if(newData) initializeData(newData);
  });

  $scope.$watch('vm.catalog', function(newCatalog) {
    if(newCatalog) initializeCatalog(newCatalog);
  });

  /*
  function declarations
   */

  function initialize() {
  }

  function initializeData(data) {
    // Set Content
    // https://docs.angularjs.org/api/ng/service/$sce#show-me-an-example-using-sce-
    // Security issue? Do it only for SVGs?
    vm.content = $sce.trustAsHtml(data);
  }

  function initializeCatalog(catalog) {
    // Set Content-Type
    if(catalog.contentType) {
      vm.contentType = catalog.contentType.split(';')[0];
    }
  }

  vm.printHandler = function() {
    var printArea = vm.content; //document.getElementById('px-printArea').innerHTML;
    var myWindow = $window.open('', '', 'width=1024, height=768');
    myWindow.document.write(printArea);
    myWindow.print();
  };
}
