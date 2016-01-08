import CardsCtrl from '../../../shell/cards/cards.controller'
import _ from 'lodash'

export default class FormlyCardsCtrl extends CardsCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService)
  }

  openDebugModal() {
    // do not open debug modal for nested components
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
  }

  getOpts() {
    var vm = this
    // Reuse parent's options
    // And override the ones needed
    return _.extend(super.getOpts(), {
      asyncPagination: false,
      showBrowseRow: false,
      showFilterRow: false,
      showSelection: vm.$stateParams.mode !== 'readonly',
    })
  }
}
