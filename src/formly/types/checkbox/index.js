export default angular.module('app.main.form.formly.type.checkbox', [])
  .run(checkbox)
  .name;

function checkbox(formlyConfig) {
  formlyConfig.setType({
    name: 'checkbox',
    overwriteOk: true,
    template: require('./template.html'),
    wrapper: ['bootstrapLabel', 'bootstrapHasError']
  });
}
