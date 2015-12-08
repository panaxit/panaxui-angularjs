import FormlyFormCtrl from './formly.form.controller';

export default angular.module('app.main.form.formly.type.form', [])
  .run(form)
  .controller('FormlyFormCtrl', FormlyFormCtrl)
  .name;

function form(formlyConfig) {
  /*
    form (nested)
   */
  formlyConfig.setType({
    name: 'form',
    template: require('./template.html'),
    wrapper: ['panel', 'bootstrapHasError'],
    controller: 'FormlyFormCtrl as vm'
  });
}
