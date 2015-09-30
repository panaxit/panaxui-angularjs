import FormlyJunctionCtrl from './formly.junction.controller';

export default angular.module('app.main.form.formly.type.junction', [])
  .config(junction)
  .controller('FormlyJunctionCtrl', FormlyJunctionCtrl)
  .name;

function junction(formlyConfigProvider) {
  /*
    junction (nested)
   */
  formlyConfigProvider.setType({
    name: 'junction',
    template: require('./template.html'),
    wrapper: ['panel', 'bootstrapHasError'],
    controller: 'FormlyJunctionCtrl as vm'
  });

}
