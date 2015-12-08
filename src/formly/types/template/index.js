import FormlyTemplateCtrl from './formly.template.controller';

export default angular.module('app.main.form.formly.type.template', [])
  .run(template)
  .controller('FormlyTemplateCtrl', FormlyTemplateCtrl)
  .name;

function template(formlyConfig) {
  /*
    template (nested)
   */
  formlyConfig.setType({
    name: 'template',
    template: require('./template.html'),
    wrapper: ['panel', 'bootstrapHasError'],
    controller: 'FormlyTemplateCtrl as vm'
  });
}
