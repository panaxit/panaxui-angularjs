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
    vm.cards = vm.$scope.options.data.cards;
    vm.catalog = vm.$scope.options.data.catalog;
  }
}

FormlyCardsCtrl.$inject = ['$scope', '$stateParams', 'CRUDService', 'DebugService'];
