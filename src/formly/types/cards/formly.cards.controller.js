import CardsCtrl from '../../../shell/cards/cards.controller';

export default class FormlyCardsCtrl extends CardsCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService) {
    super($scope, DebugService, $stateParams, CRUDService);
  }

  openDebugModal() {
    // do not open debug modal for nested components
  }

  loader() {
    var vm = this;

    // First-class options
    vm.options = {
      metadata: vm.$scope.options.data.metadata,
      fields: vm.$scope.options.data.fields,
      data: vm.$scope.model[vm.$scope.options.key] || []
    };
    // Other options
    vm.setOpts();
  }

  setOpts() {
    var vm = this;
    // Reuse parent's options
    super.setOpts();
    // Override with vm.options.whatever = ...
    vm.options.opts.asyncPagination = false;
    vm.options.opts.showBrowseRow = false;
    vm.options.opts.showFilterRow = false;
  }
}
