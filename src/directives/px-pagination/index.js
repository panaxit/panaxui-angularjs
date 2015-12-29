/**
 * Dependencies
 */

import angular from 'angular'
import dirPagination from 'angular-utils-pagination'
import coreFilters from '../../core/filters'

/**
 * Resources
 */

import './style.css'
import template from './template.html'
import dirPaginationTpl from 'ngtemplate!./dirPagination.tpl.html'

/**
 * Module
 */

export default angular.module('app.directives.pxpagination', [
  dirPagination,
  coreFilters,
])
.config(function(paginationTemplateProvider) {
  paginationTemplateProvider.setPath(dirPaginationTpl)
})
.directive('pxPagination', pxPagination)
.name

/**
 * Directive
 */

function pxPagination() {
  return {
    restrict: 'E',
    template: template,
    scope: {
      paginationOptions: '=options',
      onPaginationChange: '&?',
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: pxPaginationCtrl,
  }
}

/**
 * Directive's Controller
 */

function pxPaginationCtrl($scope) {
  var vm = this

  vm.getTotalPages = getTotalPages

  $scope.$watch(
    'vm.paginationOptions.paginationCurrentPage + vm.paginationOptions.paginationPageSize', (newValues, oldValues) => {
      if (newValues === oldValues || oldValues === undefined) {
        return
      }
      if (!angular.isNumber(vm.paginationOptions.paginationCurrentPage) ||
          vm.paginationOptions.paginationCurrentPage < 1) {
        vm.paginationOptions.paginationCurrentPage = 1
        return
      }
      if (vm.paginationOptions.totalItems > 0 && vm.paginationOptions.paginationCurrentPage > vm.getTotalPages()) {
        vm.paginationOptions.paginationCurrentPage = vm.getTotalPages()
        return
      }

      vm.onPaginationChange({
        newPage: vm.paginationOptions.paginationCurrentPage,
        newPageSize: vm.paginationOptions.paginationPageSize,
      })
    })

  function getTotalPages() {
    const numPages = vm.paginationOptions.totalItems / vm.paginationOptions.paginationPageSize
    if (!vm.paginationOptions.totalItems) { // (!vm.paginationOptions.enablePagination) {
      return null
    }
    return (vm.paginationOptions.totalItems === 0) ? 1 : Math.ceil(numPages)
  }
}
