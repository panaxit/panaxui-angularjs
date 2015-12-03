import TemplateCtrl from '../../../shell/template/template.controller';

export default class FormlyTemplateCtrl extends TemplateCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService) {
    super($scope, DebugService, $stateParams, CRUDService);
  }

  openDebugModal() {
    // do not open debug modal for nested components
  }

  loader(pageIndex, pageSize) {
    var vm = this;
    // Override metadata from field's data
    super.loader(undefined, undefined, vm.$scope.options.data.metadata);
  }

  setOptions() {
    var vm = this;
    // Reuse parent's options
    super.setOptions();
    // Override with vm.options.whatever = ...
    //vm.options.asyncPagination = false;
  }
}
