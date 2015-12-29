import angular from 'angular'

import FormCtrl from '../../../shell/form/form.controller'
import _ from 'lodash'

export default class FormlyFormCtrl extends FormCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService)
  }

  openDebugModal() {
    // do not open debug modal for nested views
  }

  loader() {
    var vm = this
    // Main `options' object
    // to be consumed by directive(s)
    vm.options = {
      metadata: vm.$scope.options.data.metadata,
      fields: vm.$scope.options.data.fields,
      data: vm.$scope.model[vm.$scope.options.key] || [],
      opts: vm.getOpts(),
    }
    if (!angular.isArray(vm.options.data)) { // If single record // ToDo: Fix in Backend
      vm.options.data = [vm.options.data]
    }
  }

  getOpts() {
    // Reuse parent's options
    // And override the ones needed
    return _.extend(super.getOpts(), {
      asyncPagination: false,
      showPaginationRow: true,
      showSaveRow: false,
      showFilterRow: false,
    })
  }
}
