export default angular.module('app.main.form.formly.type.default', [])
  .config(_default)
  .name;

function _default(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'default',
    extends: 'input',
    template: require('./template.html')
  });
}
