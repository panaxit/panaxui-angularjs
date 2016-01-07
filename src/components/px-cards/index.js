/**
 * Dependencies
 */

import angular from 'angular'
import pxPagination from '../../directives/px-pagination'
import coreFilters from '../../core/filters'

/**
 * Resources
 */

import './style.css'
import template from './template.html'

/**
 * Module
 */

export default angular.module('app.components.pxcards', [
  pxPagination,
  coreFilters,
])
.component('pxCards', {
  bindings: {
    options: '=',
    openHandler: '&',
    newHandler: '&',
    deleteHandler: '&',
    nextHandler: '&',
    paginationChangeHandler: '&?',
  },
  controller: pxCardsCtrl,
  controllerAs: 'vm',
  template: template,
})
.name

/**
 * Component's Controller
 */

function pxCardsCtrl($scope) {
  var vm = this

  /*
  vm function assignments
   */

  vm.onSelect = onSelect

  /*
  Sync initialization
   */

  init()

  /*
  Async initialization
   */

  $scope.$watch('vm.options', function(newOptions) {
    if (newOptions) {
      initData(newOptions.data)
      initMetadata(newOptions.metadata)
    }
  })

  /*
  function declarations
   */

  function init() {
    // Default pagination options
    vm.paginationOptions = {}
    vm.paginationOptions.paginationPageSizes = [4, 8, 16, 32, 64, 128]
    vm.paginationOptions.paginationId = 'pagination' + (Math.floor(Math.random() * (1000 - 1)) + 1)
      // Selected records
    vm.selectedRecords = []
  }

  function initData(data) {
    if (data) {
      vm.paginationOptions.totalItems = data.length
    }
  }

  function initMetadata(metadata) {
    if (!metadata) {
      return
    }
    // Default Upload Path (for Images)
    if (metadata.customAttrs && metadata.customAttrs.iconField) {
      vm.uploadPath = metadata.dbId + '/' + metadata.catalogName + '/' + metadata.customAttrs.iconField + '/'
    }
    // Pagination
    if (metadata.totalItems) {
      // Server-side Pagination
      vm.paginationOptions.totalItems = metadata.totalItems
      vm.paginationOptions.paginationPageSize = metadata.pageSize
      vm.paginationOptions.paginationCurrentPage = metadata.pageIndex
    } else {
      // Client-side Pagination
      //vm.paginationOptions.totalItems = data.length; // ToDo: Move back here?
      vm.paginationOptions.paginationPageSize = metadata.pageSize || 8
      vm.paginationOptions.paginationCurrentPage = metadata.pageIndex || 1
    }
  }

  function onSelect(record) {
    var index = vm.selectedRecords.indexOf(record)
    if (index > -1) {
      vm.selectedRecords.splice(index, 1)
    } else {
      vm.selectedRecords.push(record)
    }
  }
}
