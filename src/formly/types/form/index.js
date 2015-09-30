import FormlyFormCtrl from './formly.form.controller';

export default angular.module('app.main.form.formly.type.form', [])
  .config(form)
  .controller('FormlyFormCtrl', FormlyFormCtrl)
  .name;

function form(formlyConfigProvider) {
  /*
    form (nested)
   */
  formlyConfigProvider.setType({
    name: 'form',
    template: require('./template.html'),
    wrapper: ['panel', 'bootstrapHasError'],
    controller: 'FormlyFormCtrl as vm'
  });
}
