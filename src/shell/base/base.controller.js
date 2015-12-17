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
      metadata: vm.options.metadata,
      fields: vm.options.fields,
      model: vm.options.data
    });
  }

  loader() {
    // Declare but leave empty to be used by child controllers
    console.warn('BaseController.loader() called (not overriden)');
  }

  /*
  Common Handlers
  (override if needed)
   */

  onDelete(selected) {
    var vm = this;
    if(confirm("Are your sure to Delete selected record(s)?")) {
     /**
      * Create payload to be sent
      */
     var payload = {
       tableName: vm.options.metadata.catalogName,
       primaryKey: vm.options.metadata.primaryKey,
       identityKey: vm.options.metadata.identityKey
     };

     // Set DeleteRows
     payload.deleteRows = [];

     // Set primaryKey and/or identityKey as DeleteRows
     angular.forEach(selected, function(row, index) {
       var identifier = row[vm.options.metadata.primaryKey] ||
                        row[vm.options.metadata.identityKey];

       payload.deleteRows[index] = {};
       if(payload.primaryKey)
         payload.deleteRows[index][payload.primaryKey] = identifier;
       if(payload.identityKey)
         payload.deleteRows[index][payload.identityKey] = identifier;
     });

     vm.CRUDService.delete(payload).then(function (res) {
       if(res.success === true) {
         if(res.data[0].status === 'error') {
           vm.AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
         } else if(res.data[0].status === 'success') {
           vm.AlertService.show('success', 'Deleted', 'Record(s) successfully deleted');
           // Remove row(s) from Grid // http://stackoverflow.com/questions/26614641/how-to-properly-delete-selected-items-ui-grid-angular-js
           // angular.forEach(selected, function(row, index) {
           //   vm.data.splice(vm.data.lastIndexOf(row), 1);
           // });
           // Emit 'reloadData' instead
           vm.$scope.$emit('reloadData');
         }
       } else {
         // Do nothing. HTTP 500 responses handled by ErrorInterceptor
       }
     });
    }
  }

  onNew(catalogName) {
    this.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: catalogName,
      mode: 'insert',
      id: undefined
    });
  }

  onOpen(selected) {
    var vm = this;
    var idType = (!!vm.options.metadata.identityKey) ? 'identityKey' : 'primaryKey';
    var idKey = vm.options.metadata[idType];
    var idValue = selected[idKey];

    vm.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: vm.options.metadata.catalogName,
      mode: vm.options.metadata.mode,
      [idType]: idKey,
      id: idValue
    });
  }

  onNext(selected) {
    var vm = this;
    var len = selected.length,
        idKey = vm.options.metadata.identityKey || vm.options.metadata.primaryKey,
        filters = '[' + idKey + ' IN (';
    angular.forEach(selected, function(row, index) {
      filters += `'${row[idKey]}'`;
      if(index !== len-1) {
        filters += ', ';
      }
    });
    filters += ')]';
    // ToDo: PanaxDB Routes
    vm.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: vm.options.metadata.catalogName,
      mode: 'edit',
      filters: filters
    });
  }
}
