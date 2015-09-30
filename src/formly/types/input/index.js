export default angular.module('app.main.form.formly.type.input', [])
  .config(input)
  .name;

function input(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'input',
    overwriteOk: true,
    template: require('./template.html'),
    wrapper: ['bootstrapLabel', 'bootstrapHasError']
  });
}
