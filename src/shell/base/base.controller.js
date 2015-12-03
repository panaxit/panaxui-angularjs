export default class BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService, $q, PayloadService, $window) {
    var vm = this;

    // Injectables
    vm.$scope = $scope;
    vm.DebugService = DebugService;
    vm.$stateParams = $stateParams;
    vm.CRUDService = CRUDService;
    vm.AlertService = AlertService;
    vm.$q = $q;
    vm.PayloadService = PayloadService;
    vm.$window = $window;

    // Loader
    vm.loader();

    vm.$scope.$on('reloadData', function (event, next) {
      // ToDo: Redraw (re-render) grid. Ex.: when hiding, showing columns
      vm.loader();
    });

    // Debug Modal
    vm.$scope.$on('openDebugModal', (event, next) => { vm.openDebugModal(); });
  }

  // General-purpose debug modal
  openDebugModal() {
    var vm = this;
    vm.DebugService.show({
      metadata: vm.metadata,
      fields: vm.fields,
      model: vm.data
    });
  }

  loader() {
    // Declare but leave empty to be used by child controllers
    console.warn('BaseController.loader() called (not overriden)');
  }
}
