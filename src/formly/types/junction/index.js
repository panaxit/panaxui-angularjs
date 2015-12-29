import angular from 'angular'

import FormlyJunctionCtrl from './formly.junction.controller'

export default angular.module('app.main.form.formly.type.junction', [])
  .run(junction)
  .controller('FormlyJunctionCtrl', FormlyJunctionCtrl)
  .name

function junction(formlyConfig) {
  /*
    junction (nested)
   */
  formlyConfig.setType({
    name: 'junction',
    template: require('./template.html'),
    wrapper: ['panel', 'bootstrapHasError'],
    controller: 'FormlyJunctionCtrl as vm',
  })

}
