import FormlyTemplateCtrl from './formly.template.controller';

export default angular.module('app.main.form.formly.type.template', [])
  .config(template)
  .controller('FormlyTemplateCtrl', FormlyTemplateCtrl)
  .name;

function template(formlyConfigProvider) {
  /*
    template (nested)
   */
  formlyConfigProvider.setType({
    name: 'template',
    template: require('./template.html'),
    wrapper: ['panel', 'bootstrapHasError'],
    controller: 'FormlyTemplateCtrl as vm'
  });
}
