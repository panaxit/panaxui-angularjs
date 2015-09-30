export default angular.module('app.main.form.formly.type.number', [])
  .config(number)
  .name;

function number(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'number',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'number'
      }
    }
  });
}
