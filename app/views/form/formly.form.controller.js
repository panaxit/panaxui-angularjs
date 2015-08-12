import FormCtrl from './form.controller';

export default class FormlyFormCtrl extends FormCtrl {
  constructor($scope, $stateParams, $q, CRUDService, AlertService, DebugService) {
    super($scope, $stateParams, $q, CRUDService, AlertService, DebugService);
  }

  openDebugModal() {
    // do not open debug modal for nested views
  }

  load() {
    var vm = this;
    var deferred = this.$q.defer();
    vm.data = vm.$scope.model[vm.$scope.options.key] || [];
    vm.fields = vm.$scope.options.data.fields;
    vm.catalog = vm.$scope.options.data.catalog;
    deferred.resolve();
    return deferred.promise;
  }
}

FormlyFormCtrl.$inject = ['$scope', '$stateParams', '$q', 'CRUDService', 'AlertService', 'DebugService'];

