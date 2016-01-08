/**
 * Dependencies
 */

import angular from 'angular'
import formly from 'angular-formly'
import formlyBootstrap from 'angular-formly-templates-bootstrap'
import pxPagination from '../../components/px-pagination'
import coreFilters from '../../core/filters'

/**
 * Resources
 */

import './style.css'
import template from './template.html'

/**
 * Module
 */

export default angular.module('app.components.pxform', [
  formly,
  formlyBootstrap,
  pxPagination,
  coreFilters,
])
.component('pxForm', {
  bindings: {
    options: '=',
    form: '=?',
    paginationChangeHandler: '&?',
  },
  controller: pxFormCtrl,
  controllerAs: 'vm',
  template: template,
})
.name

/**
 * Component's Controller
 */

function pxFormCtrl($scope, $timeout) {
  var vm = this

  /*
  vm function assignments
   */

  vm.isSubmitDisabled = isSubmitDisabled

  /*
  Sync initialization
   */

  init()

  /*
  Async initialization
   */

  $scope.$watch('vm.options', function(newOptions) {
    if (newOptions) {
      initMetadata(newOptions.metadata, newOptions.data)
      initFields(newOptions.fields, newOptions.data)
      // deferred after form initialization
      $timeout(initReferrerValue)
    }
  })

  /*
  function declarations
   */

  function init() {
    // Default options
    vm.paginationOptions = {}
    vm.paginationOptions.paginationPageSizes = [1, 2, 3, 5, 8, 13]
    vm.paginationOptions.paginationId = 'pagination' + getRandomInt(0, 9999)
  }

  function initFields(fields, data) {
    var countRecords, index
    if (!fields || !data) {
      return
    }
    // Not already initialized as array
    if (!(fields[0] && angular.isArray(fields[0]))) {
      // Fields array initialization
      // Based on: http://angular-formly.com/#/example/advanced/repeating-section
      vm.options.fields = []
      // Get total number of records (multiple paginated), at least create One
      countRecords = data.length || 1
      for (index = 0; index < countRecords; index++) {
        vm.options.fields.push(copyFields(fields, index))
      }
    }
  }

  function initMetadata(metadata, data) {
    if (!metadata) {
      return
    }
    // Pagination
    if (metadata.totalItems) {
      // Server-side Paginationa
      vm.paginationOptions.totalItems = metadata.totalItems
      vm.paginationOptions.paginationPageSize = metadata.pageSize
      vm.paginationOptions.paginationCurrentPage = metadata.pageIndex
    } else {
      // Client-side Pagination
      vm.paginationOptions.totalItems = data.length
      vm.paginationOptions.paginationPageSize = metadata.pageSize || 1
      vm.paginationOptions.paginationCurrentPage = metadata.pageIndex || 1
    }
  }

  function copyFields(fields) {
    var newFields = angular.copy(fields)
    addRandomIds(newFields)
    return newFields
  }

  function addRandomIds(fields) {
    angular.forEach(fields, function(field, index) {
      if (field.fields) {
        addRandomIds(field.fields)
        return // fieldsets/tab don't need an ID
      }
      if (field.fieldGroup) {
        addRandomIds(field.fieldGroup)
        return // fieldGroups don't need an ID
      }
      if (field.type && field.type === 'tabPanel' && field.data && field.data.tabs) {
        addRandomIds(field.data.tabs)
        return // tabPanel don't need an ID
      }
      if (field.data && field.data.fields) {
        addRandomIds(field.data.fields)
        return // nested fields don't need an ID
      }

      field.id = field.id || (field.key + '_' + index + '_' + getRandomInt(0, 9999))
    })
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  function initReferrerValue() {
    var ref = vm.options.metadata.ref
    var refId = vm.options.metadata.refId
    var fieldName = Object.keys(vm.form).filter((x)=>x.startsWith(ref))[0]
    if (ref && refId && fieldName && vm.form[fieldName]) {
      vm.options.data[0][ref] = refId
      vm.form[fieldName].$setDirty(true)
    }
  }

  function isSubmitDisabled() {
    if (vm.form) {
      if (vm.options.metadata && vm.options.metadata.mode !== 'readonly') {
        if (vm.options.metadata.mode === 'insert') {
          if (vm.form.$invalid) {
            return true
          }
          return false
        } else if (vm.options.metadata.mode === 'edit') {
          if (vm.form.$pristine) {
            return true
          }
          if (vm.form.$invalid) {
            return true
          }
          return false
        }
      }
    }
    return true
  }
}
