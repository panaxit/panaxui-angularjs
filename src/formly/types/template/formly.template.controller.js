import TemplateCtrl from '../../../shell/template/template.controller'
import _ from 'lodash'

export default class FormlyTemplateCtrl extends TemplateCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService) {
    super($scope, DebugService, $stateParams, CRUDService)
  }

  openDebugModal() {
    // do not open debug modal for nested components
  }

  loader() {
    var vm = this
    /*
    In contrast to other formly's controllers,
    this one actually calls super's loader
    to to get the template (xhr).
    Nevertheless metadata must be overriden
    from formly field's .data to set filters
     */
    const metadata = vm.$scope.options.data.metadata
    const idValue = vm.$scope.model[metadata.foreignReference]
    const filters = `'${metadata.foreignReference}=${idValue}'`
    super.loader(_.extend(metadata, {filters}))
  }

  getOpts() {
    // Reuse parent's options
    // And override the ones needed
    return _.extend(super.getOpts(), {})
  }
}
