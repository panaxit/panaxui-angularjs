import GridCtrl from '../../../shell/grid/grid.controller';
import _ from 'lodash';

export default class FormlyGridCtrl extends GridCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService, $q) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService, $q);
  }

  openDebugModal() {
    // do not open debug modal for nested views
  }

  loader() {
    var vm = this;
    // Main `options' object
    // to be consumed by directive(s)
    vm.options = {
      metadata: vm.$scope.options.data.metadata,
      fields: vm.$scope.options.data.fields,
      data: vm.$scope.model[vm.$scope.options.key],
      opts: vm.getOpts()
    };
  }

  getOpts() {
    // Reuse parent's options
    // And override the ones needed
    return _.extend(super.getOpts(), {});
  }
}
