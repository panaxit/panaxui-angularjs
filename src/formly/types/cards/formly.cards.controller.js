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
    vm.options = {
      asyncPagination: false,
      showPaginationRow: true,
      showBrowseRow: false,
      showFilterRow: false
    };
  }
}
