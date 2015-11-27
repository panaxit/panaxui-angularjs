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

    vm.data = vm.$scope.model[vm.$scope.options.key] || [];
    vm.fields = vm.$scope.options.data.fields;
    vm.catalog = vm.$scope.options.data.catalog;

    vm.setOptions();
  }

  setOptions() {
    var vm = this;
    // Reuse parent's options
    super.setOptions();
    // Override with vm.options.whatever = ...
    vm.options.asyncPagination = false;
    vm.options.showBrowseRow = false;
    vm.options.showFilterRow = false;
  }
}
