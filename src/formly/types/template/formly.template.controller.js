import TemplateCtrl from '../../../shell/template/template.controller';
import _ from 'lodash';

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

  getOpts() {
    // Reuse parent's options
    // And override the ones needed
    return _.extend(super.getOpts(), {});
  }
}
