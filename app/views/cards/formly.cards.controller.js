import CardsCtrl from './cards.controller';

export default class FormlyCardsCtrl extends CardsCtrl {
  constructor($scope, $stateParams, CRUDService, DebugService) {
    super($scope, $stateParams, CRUDService, DebugService);
    var vm = this;

    vm.$scope = $scope;
    vm.$stateParams = $stateParams;
    vm.CRUDService = CRUDService;
    vm.DebugService = DebugService;
  }

  openDebugModal() {
    // do not open debug modal for nested views
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

FormlyCardsCtrl.$inject = ['$scope', '$stateParams', 'CRUDService', 'DebugService'];
