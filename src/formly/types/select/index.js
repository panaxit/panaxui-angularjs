export default angular.module('app.main.form.formly.type.select', [])
  .config(select)
  .name;

function select(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'select',
    overwriteOk: true,
    template: require('./template.html'),
    wrapper: ['bootstrapLabel', 'bootstrapHasError']
  });
}
